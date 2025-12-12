import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

// Components
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardGreeting } from "../components/DashboardGreeting";
import { DashboardSearchBar } from "../components/DashboardSearchBar";
import { SearchSkeleton } from "../components/SearchSkeleton";
import { AIResponseCard } from "../components/AIResponseCard";
import { MostRelevantContent } from "../components/MostRelevantContent";
import { StatsFilterTabs } from "../components/StatsFilterTabs";
import { ContentGrid } from "../components/ContentGrid";
import { CreateContentModal } from "../components/CreateContentModal";
import { NoteEditor } from "../components/NoteEditor";
import { BookmarkWebsiteModal } from "../components/BookmarkWebsiteModal";
// Sidebar removed as it is not currently used in the layout

// Hooks
import { UseContent } from "../hooks/UseContent";
import { useRef } from "react";
import { useUser } from "../hooks/useUser";
import { useOptimisticContent } from "../hooks/useOptimisticUpdates";
import { useTheme } from "../contexts/ThemeContext";

// Types
import type { Content, ContentType } from "../types/content";

// Utils
import { showToast } from "../utils/toast";

type ContentFilter = "all" | ContentType;

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookmarkModalOpen, setBookmarkModalOpen] = useState(false);
  /* const [filter, setFilter] = useState<ContentFilter>('all'); needs to be restored from previous edits */
  /* Re-implementing filter state */
  const [filter, setFilter] = useState<ContentFilter>("all");

  const {
    contents,
    loading,
    refresh,
    createContent,
    updateContent,
    deleteContent,
  } = UseContent();

  const { user, logout } = useUser();
  const { optimisticDelete, optimisticUpdate } = useOptimisticContent();
  const { theme } = useTheme();

  const [showNoteModal, setShowNoteModal] = useState(false);

  // Search state
  // Removed displayedContents - now using contents directly for all memories
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [showAiResponse, setShowAiResponse] = useState(false);
  const [relevantContent, setRelevantContent] = useState<Content[]>([]);
  const [searchTime, setSearchTime] = useState<number | undefined>();
  const [resultCount, setResultCount] = useState<number | undefined>();
  const [isSearching, setIsSearching] = useState(false);
  const searchCacheRef = useRef<
    Map<
      string,
      {
        relevantContent: Content[];
        aiResponse: string;
        searchTime: number;
        resultCount: number;
        timestamp: number;
      }
    >
  >(new Map());
  const abortControllerRef = useRef<AbortController | null>(null);

  // Poll for AI updates if anything is processing
  useEffect(() => {
    // Check if any content is in processing state
    const isProcessing = contents?.some(
      (c) =>
        c.processingStatus === "processing" || c.processingStatus === "pending",
    );

    if (!isProcessing) return;

    const interval = setInterval(() => {
      refresh(true); // silent refresh (assuming UseContent supports an argument or we just call it)
    }, 3000);

    return () => clearInterval(interval);
  }, [contents, refresh]);

  useEffect(() => {
    refresh();
  }, [modalOpen, showNoteModal, bookmarkModalOpen, refresh]);

  // Filter all contents based on selected filter
  const filteredContents = (contents || []).filter((content: Content) => {
    if (filter === "all") return true;
    return content.type === filter;
  });

  const handleCreateNote = useCallback(
    async (data: { title: string; content: string }) => {
      const loadingToast = showToast.loading("Creating note...");
      try {
        await createContent({
          content: data.content,
          type: "note",
          tags: [],
        });
        setShowNoteModal(false);
        showToast.dismiss(loadingToast);
        showToast.contentAdded("Note");
      } catch (error) {
        console.error("Error creating note:", error);
        showToast.dismiss(loadingToast);
        showToast.error("Failed to create note. Please try again.");
      }
    },
    [createContent],
  );

  const handleUpdateContent = useCallback(
    async (updatedContent: Content) => {
      await optimisticUpdate(
        updatedContent._id,
        updatedContent,
        () => updateContent(updatedContent._id, updatedContent),
        // Toast is already shown by optimisticUpdate
      );
    },
    [updateContent, optimisticUpdate],
  );

  const handleDeleteContent = useCallback(
    async (id: string) => {
      await optimisticDelete(
        id,
        () => deleteContent(id),
        // Toast is already shown by optimisticDelete
      );
    },
    [deleteContent, optimisticDelete],
  );

  const handleAiSearch = async (query: string) => {
    const cacheKey = query.toLowerCase().trim();

    // Check cache first (5 min TTL)
    const cached = searchCacheRef.current.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
      // Use cached results instantly
      setRelevantContent(cached.relevantContent);
      setAiResponse(cached.aiResponse);
      setSearchTime(cached.searchTime);
      setResultCount(cached.resultCount);
      setShowAiResponse(true);
      setFilter("all");
      showToast.aiSearchCompleted();
      return;
    }

    // Cancel previous request if still running
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    const searchToast = showToast.aiSearchStarted();
    const startTime = performance.now();

    try {
      setIsSearching(true);
      setShowAiResponse(true);
      setAiResponse("Analyzing your memories...");

      // Use vector search endpoint (limit 3 for speed)
      const response = await axios.get(`${BACKEND_URL}/content/search`, {
        params: { query, limit: 3 },
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
        signal: abortControllerRef.current.signal,
      });

      const endTime = performance.now();
      const timeTaken = Math.round(endTime - startTime);

      setSearchTime(timeTaken);
      setResultCount(response.data.content?.length || 0);

      // Show results immediately
      // Show results with Smart Filtering
      if (response.data.content && response.data.content.length > 0) {
        const rawResults = response.data.content;

        // Smart Filter Logic:
        // If the top result is significantly better than the second (Gap Detection), show only 1.
        // Otherwise, show up to 3.
        let filteredResults = rawResults;

        if (rawResults.length >= 2) {
          const score1 = rawResults[0].score || 0;
          const score2 = rawResults[1].score || 0;

          // Smart Filter 2.0 (Precision Optimized):
          // 1. Gap Check: If Top 1 is > 10% better than Top 2 (0.1), it's the clear winner.
          // 2. Relevance Floor: If 2nd result is below 75% match (< 0.75), treat it as noise.
          if (score1 - score2 > 0.1 || score2 < 0.75) {
            filteredResults = [rawResults[0]];
          } else {
            // Only show multiple if they are both high quality AND close in score
            filteredResults = rawResults.slice(0, 3);
          }
        }

        setRelevantContent(filteredResults);
      } else {
        setRelevantContent([]);
      }

      // Get AI response
      try {
        const aiResponse = await axios.post(
          `${BACKEND_URL}/content/ai-search`,
          {
            query,
            // Optimization: Remove embeddings and other heavy data before sending back
            context:
              response.data.content?.map((item: Content) => ({
                _id: item._id,
                type: item.type,
                title:
                  item.type === "note"
                    ? item.title
                    : item.type === "website"
                      ? item.websiteMetadata?.title
                      : undefined,
                summary: item.summary,
                // Optimization: Send content for all types but truncate to avoid Payload Too Large
                content: item.content
                  ? item.content.substring(0, 5000)
                  : undefined,
                createdAt: item.createdAt,
                link: item.link,
              })) || [],
          },
          {
            headers: {
              Authorization: localStorage.getItem("token") || "",
            },
            signal: abortControllerRef.current.signal,
          },
        );

        setAiResponse(aiResponse.data.response);

        // Cache the results
        searchCacheRef.current.set(cacheKey, {
          relevantContent: response.data.content || [],
          aiResponse: aiResponse.data.response,
          searchTime: timeTaken,
          resultCount: response.data.content?.length || 0,
          timestamp: Date.now(),
        });

        setFilter("all");
        showToast.dismiss(searchToast);
        showToast.aiSearchCompleted();
      } catch (aiError: unknown) {
        // Handle AI-specific errors
        if (axios.isAxiosError(aiError) && aiError.name === "CanceledError") {
          return;
        }

        console.error("AI Search Failed", aiError);

        let errorMessage = "Sorry, I couldn't process your request right now.";

        if (axios.isAxiosError(aiError) && aiError.response?.status === 503) {
          // Service unavailable - Gemini overloaded
          errorMessage =
            aiError.response?.data?.message ||
            "The AI service is currently experiencing high demand. Please try again in a few moments.";

          // Show error in the AI response card
          setAiResponse(
            `⚠️ ${errorMessage}\n\nYour search results are still available below.`,
          );
        } else if (
          axios.isAxiosError(aiError) &&
          aiError.response?.data?.message
        ) {
          errorMessage = aiError.response.data.message;
          setAiResponse(`⚠️ ${errorMessage}`);
        } else {
          setAiResponse("⚠️ Unable to generate AI response. Please try again.");
        }

        showToast.dismiss(searchToast);
        showToast.error(errorMessage);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.name === "CanceledError") {
        // Request was cancelled, ignore
        return;
      }
      console.error("Search Failed", error);
      setAiResponse("⚠️ Search failed. Please try again.");
      showToast.dismiss(searchToast);
      showToast.networkError();
    } finally {
      setIsSearching(false);
    }
  };

  const handleCloseAiResponse = () => {
    setShowAiResponse(false);
    setAiResponse(null);
    setRelevantContent([]);
    setSearchTime(undefined);
    setResultCount(undefined);
  };
  return (
    <>
      <div
        className={`min-h-screen w-full relative transition-colors duration-300 ${
          theme === "light" ? "bg-white" : "bg-black"
        }`}
        style={{
          backgroundColor: theme === "light" ? "#ffffff" : "#000000",
        }}
      >
        {/* Theme-based Background Pattern */}
        {theme === "light" ? (
          /* Light Theme - Noise Texture (Darker Dots) Background */
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "#ffffff",
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />
        ) : (
          /* Dark Theme - Dark White Dotted Grid Background */
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "#000000",
              backgroundImage: `
                radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
              `,
              backgroundSize: "30px 30px",
              backgroundPosition: "0 0",
            }}
          />
        )}

        {/* Header */}
        <DashboardHeader
          user={user}
          onLogout={logout}
          onAddMemory={() => setModalOpen(true)}
        />

        {/* Main Content */}
        <main
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative z-10 ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          {/* Greeting */}
          <DashboardGreeting
            username={user?.username}
            memoryCount={filteredContents.length}
          />

          {/* Search Bar */}
          <DashboardSearchBar
            onAiSearch={handleAiSearch}
            isSearching={isSearching}
          />

          {/* Search Results Area - Fixed Height with Scroll */}
          {isSearching ? (
            <div className="mt-6">
              <SearchSkeleton />
            </div>
          ) : showAiResponse && relevantContent.length > 0 ? (
            <div className="max-w-4xl mx-auto mt-8 mb-20 space-y-12 animate-fadeIn">
              {/* AI Response Section (First) */}
              <div className="space-y-4">
                <div
                  className={`flex items-center gap-2 px-1 ${theme === "light" ? "text-black/60" : "text-white/60"}`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <h3 className="text-xs font-bold uppercase tracking-widest">
                    AI Insight
                  </h3>
                </div>

                {aiResponse && (
                  <div
                    className={`p-1 rounded-3xl ${theme === "light" ? "bg-gradient-to-br from-purple-100 to-blue-50" : "bg-gradient-to-br from-purple-900/20 to-blue-900/10"}`}
                  >
                    <div className="shadow-2xl shadow-purple-500/5 rounded-2xl overflow-hidden">
                      <AIResponseCard
                        response={aiResponse}
                        onClose={handleCloseAiResponse}
                        searchTime={searchTime}
                        resultCount={resultCount}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Search Results Section (Second) */}
              <div className="space-y-6">
                <div
                  className={`flex items-center gap-2 px-1 ${theme === "light" ? "text-black/60" : "text-white/60"}`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <h3 className="text-xs font-bold uppercase tracking-widest">
                    Relevant Memories
                  </h3>
                </div>
                <MostRelevantContent
                  contents={relevantContent}
                  isLoading={aiResponse === "Analyzing your memories..."}
                  onUpdateContent={handleUpdateContent}
                  onDeleteContent={handleDeleteContent}
                />
              </div>
            </div>
          ) : showAiResponse && aiResponse ? (
            <div className="mt-6 mb-4 max-h-[600px]">
              <AIResponseCard
                response={aiResponse}
                onClose={handleCloseAiResponse}
                searchTime={searchTime}
                resultCount={resultCount}
              />
            </div>
          ) : null}

          {/* Filter Tabs */}
          <StatsFilterTabs
            filter={filter}
            onFilterChange={setFilter}
            contents={contents}
          />

          {/* Content Grid - Always show all bookmarks */}
          <ContentGrid
            contents={filteredContents}
            loading={loading}
            onUpdateContent={handleUpdateContent}
            onDeleteContent={handleDeleteContent}
            onAddMemory={() => setModalOpen(true)}
          />
        </main>

        {/* Modals */}
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <BookmarkWebsiteModal
          open={bookmarkModalOpen}
          onClose={() => setBookmarkModalOpen(false)}
        />

        {showNoteModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-md">
              <NoteEditor
                onSave={handleCreateNote}
                onCancel={() => {
                  setShowNoteModal(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
