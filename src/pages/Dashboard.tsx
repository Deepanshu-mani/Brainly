import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

// Components
import { DashboardHeader } from '../components/DashboardHeader';
import { DashboardGreeting } from '../components/DashboardGreeting';
import { DashboardSearchBar } from '../components/DashboardSearchBar';
import { AIResponseCard } from '../components/AIResponseCard';
import { MostRelevantContent } from '../components/MostRelevantContent';
import { StatsFilterTabs } from '../components/StatsFilterTabs';
import { ContentGrid } from '../components/ContentGrid';
import { CreateContentModal } from '../components/CreateContentModal';
import { NoteEditor } from '../components/NoteEditor';
import { BookmarkWebsiteModal } from '../components/BookmarkWebsiteModal';
import { FilterContext } from '../ui/Sidebar';

// Hooks
import { UseContent } from '../hooks/UseContent';
import { useUser } from '../hooks/useUser';
import { useTheme } from '../contexts/ThemeContext';

// Types
import type { Content, ContentType } from '../types/content';

// Utils
import { showToast } from '../utils/toast';

type ContentFilter = 'all' | ContentType;

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookmarkModalOpen, setBookmarkModalOpen] = useState(false);
  const [filter, setFilter] = useState<ContentFilter>('all');
  
  const { 
    contents, 
    loading, 
    refresh,
    createContent,
    updateContent,
    deleteContent
  } = UseContent();

  const { user, logout } = useUser();
  const { theme } = useTheme();
  
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [isReminder, setIsReminder] = useState(false);

  // Search state
  const [displayedContents, setDisplayedContents] = useState<Content[]>([]);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [showAiResponse, setShowAiResponse] = useState(false);
  const [relevantContent, setRelevantContent] = useState<Content[]>([]);

  useEffect(() => {
    refresh();
  }, [modalOpen, showNoteModal, bookmarkModalOpen]);

  useEffect(() => {
    setDisplayedContents(contents || []);
  }, [contents]);

  const filteredContents = (displayedContents || []).filter((content: Content) => {
    if (filter === 'all') return true;
    return content.type === filter;
  });

  const handleCreateNote = async (data: { title: string; content: string }) => {
    const loadingToast = showToast.loading('Creating note...');
    try {
      await createContent({
        content: data.content,
        type: 'note',
        tags: []
      });
      setShowNoteModal(false);
      await refresh();
      showToast.dismiss(loadingToast);
      showToast.contentAdded('Note');
    } catch (error) {
      console.error('Error creating note:', error);
      showToast.dismiss(loadingToast);
      showToast.error('Failed to create note. Please try again.');
    }
  };
  
  const handleUpdateContent = async (updatedContent: Content) => {
    const loadingToast = showToast.loading('Updating content...');
    try {
      await updateContent(updatedContent._id, updatedContent);
      await refresh();
      showToast.dismiss(loadingToast);
      showToast.contentUpdated();
    } catch (error) {
      console.error('Error updating content:', error);
      showToast.dismiss(loadingToast);
      showToast.error('Failed to update content. Please try again.');
    }
  };
  
  const handleDeleteContent = async (id: string) => {
    const loadingToast = showToast.loading('Deleting content...');
    try {
      await deleteContent(id);
      await refresh();
      showToast.dismiss(loadingToast);
      showToast.contentDeleted();
    } catch (error) {
      console.error('Error deleting content:', error);
      showToast.dismiss(loadingToast);
      showToast.error('Failed to delete content. Please try again.');
    }
  };

  // Create a sidebar-compatible filter type
  type SidebarFilter = 'all' | 'twitter' | 'youtube' | 'website' | 'notes';
  
  const sidebarFilter: SidebarFilter = filter === 'note' ? 'notes' : (filter as SidebarFilter);
  const handleSidebarFilterChange = (newFilter: SidebarFilter) => {
    setFilter(newFilter === 'notes' ? 'note' : newFilter);
  };

  const handleAiSearch = async (query: string) => {
    const searchToast = showToast.aiSearchStarted();
    try {
      setShowAiResponse(true);
      setAiResponse("Analyzing your memories...");
      // Clear displayed contents during search
      setDisplayedContents([]);
      
      const response = await axios.get(`${BACKEND_URL}/content/ai-search`, {
        params: { query },
        headers: {
          Authorization: localStorage.getItem("token") || ""
        }
      });
      
      setAiResponse(response.data.response);
      
      // Store relevant content from AI search
      if (response.data.relevantContent && response.data.relevantContent.length > 0) {
        setRelevantContent(response.data.relevantContent);
      } else {
        setRelevantContent([]);
      }
      
      // Keep all content displayed, AI response will show above
      setDisplayedContents(contents || []);
      // Set filter to 'all' to show all types of content
      setFilter('all');
      
      showToast.dismiss(searchToast);
      showToast.aiSearchCompleted();
    } catch (error) {
      console.error("AI search failed:", error);
      setAiResponse("Sorry, I couldn't process your request right now. Please try again.");
      showToast.dismiss(searchToast);
      showToast.networkError();
    }
  };

  const handleCloseAiResponse = () => {
    setShowAiResponse(false);
    setAiResponse(null);
    setRelevantContent([]);
    setDisplayedContents(contents || []);
  };

  return (
    <FilterContext.Provider value={{ filter: sidebarFilter, setFilter: handleSidebarFilterChange }}>
      <div 
        className={`min-h-screen w-full relative transition-colors duration-300 ${
          theme === 'light' ? 'bg-white' : 'bg-black'
        }`}
        style={{
          backgroundColor: theme === 'light' ? '#ffffff' : '#000000'
        }}
      >
        {/* Theme-based Background Pattern */}
        {theme === 'light' ? (
          /* Light Theme - Noise Texture (Darker Dots) Background */
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "#ffffff",
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
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
        <main className={`max-w-7xl mx-auto px-6 lg:px-8 py-10 relative z-10 ${
          theme === 'light' ? 'text-black' : 'text-white'
        }`}>
          {/* Greeting */}
          <DashboardGreeting 
            username={user?.username}
            memoryCount={filteredContents.length}
          />
                  
          {/* Search Bar */}
          <DashboardSearchBar onAiSearch={handleAiSearch} />

          {/* AI Response */}
          {showAiResponse && aiResponse && (
            <AIResponseCard 
              response={aiResponse}
              onClose={handleCloseAiResponse}
            />
          )}

          {/* Most Relevant Content - Below AI Response */}
          {showAiResponse && relevantContent.length > 0 && (
            <MostRelevantContent
              contents={relevantContent}
              isLoading={aiResponse === "Analyzing your memories..."}
              onUpdateContent={handleUpdateContent}
              onDeleteContent={handleDeleteContent}
              onRefresh={refresh}
            />
          )}

          {/* Filter Tabs */}
          <StatsFilterTabs
            filter={filter}
            onFilterChange={setFilter}
            contents={displayedContents}
          />

          {/* Content Grid - Always show all bookmarks */}
          <ContentGrid
            contents={filteredContents}
            loading={loading}
            onUpdateContent={handleUpdateContent}
            onDeleteContent={handleDeleteContent}
            onRefresh={refresh}
            onAddMemory={() => setModalOpen(true)}
          />
        </main>

        {/* Modals */}
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <BookmarkWebsiteModal open={bookmarkModalOpen} onClose={() => setBookmarkModalOpen(false)} />
        
        {showNoteModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-md">
              <NoteEditor
                onSave={handleCreateNote}
                onCancel={() => {
                  setShowNoteModal(false);
                  setIsReminder(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </FilterContext.Provider>
  ); 
}