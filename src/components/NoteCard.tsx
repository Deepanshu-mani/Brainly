import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NoteEditor } from "./NoteEditor";
import type { Content } from "../types/content";
import { StickyNote, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { CardActionButton } from "./SocialButton";
type NoteCardProps = {
  content: Content;
  onUpdate?: (updatedContent: Content) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  isShared?: boolean;
  compact?: boolean;
  score?: number;
};

export const NoteCard = React.memo(function NoteCard({
  content,
  onUpdate,
  onDelete,
  isShared,
  compact,
  score,
}: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();

  // Lock body scroll when expanded
  useEffect(() => {
    if (!isExpanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isExpanded]);

  const handleSave = async (data: { title: string; content: string }) => {
    try {
      const trimmedContent = data.content.trim();
      const updatedAt = new Date().toISOString();

      let updatedContent: Content;

      if (content.type === "note") {
        updatedContent = {
          ...content,
          content: trimmedContent,
          link: `data:text/plain;charset=utf-8,${encodeURIComponent(trimmedContent)}`,
          updatedAt,
          type: "note",
        };
      } else if (content.type === "twitter" || content.type === "youtube") {
        const link = content.link?.startsWith("data:text/plain;charset=utf-8,")
          ? `data:text/plain;charset=utf-8,${encodeURIComponent(trimmedContent)}`
          : (content.link ?? "");

        updatedContent = {
          ...content,
          link,
          content: trimmedContent,
          updatedAt,
          type: content.type,
        };
      } else {
        throw new Error(`Unsupported content type: ${content.type}`);
      }

      if (!onUpdate) return;
      await onUpdate(updatedContent);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!onDelete) return;
      await onDelete(content._id);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const getNoteContent = () => {
    try {
      if (content.link?.startsWith("data:text/plain;charset=utf-8,")) {
        return decodeURIComponent(content.link.split(",")[1] || "").trim();
      }
    } catch (e) {
      console.warn("Failed to decode content.link:", e);
    }
    return (content.content ?? "").trim();
  };

  const createdAt = content.createdAt || content.updatedAt;
  const formattedDate = createdAt
    ? (() => {
        const d = new Date(createdAt);
        return isNaN(d.getTime())
          ? ""
          : d.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
      })()
    : "";

  // Compact List Item View
  if (compact) {
    return (
      <>
        <div
          onClick={() => setIsExpanded(true)}
          className={`group flex items-center gap-4 p-4 w-full rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-sm ${
            theme === "light"
              ? "bg-white/60 border-black/5 hover:bg-white/80 hover:shadow-lg hover:shadow-black/5 hover:border-black/10"
              : "bg-black/60 border-white/5 hover:bg-black/80 hover:shadow-lg hover:shadow-white/5 hover:border-white/10"
          }`}
        >
          {/* Icon Box */}
          <div
            className={`flex-shrink-0 p-3 rounded-xl transition-colors duration-300 ${
              theme === "light"
                ? "bg-black/5 text-black/70 group-hover:bg-black/10 group-hover:text-black"
                : "bg-white/5 text-white/70 group-hover:bg-white/10 group-hover:text-white"
            }`}
          >
            <StickyNote className="w-4 h-4" />
          </div>

          {/* Content Info */}
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-sm truncate mb-0.5 ${theme === "light" ? "text-black" : "text-white"}`}
            >
              {"title" in content ? content.title : "Note"}
            </h3>
            <p
              className={`text-xs truncate ${theme === "light" ? "text-black/50" : "text-white/50"}`}
            >
              {getNoteContent().substring(0, 60)}...
            </p>
          </div>

          {/* Match Score Badge */}
          {score !== undefined && (
            <div
              className={`flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-full border ${
                theme === "light"
                  ? "bg-purple-100/50 text-purple-700 border-purple-200"
                  : "bg-purple-900/30 text-purple-300 border-purple-800/50"
              }`}
            >
              {Math.round(score * 100)}% Match
            </div>
          )}
        </div>

        {/* Reuse Expanded View */}
        {isExpanded &&
          createPortal(
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsExpanded(false);
              }}
            >
              <div
                className={`relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 pb-8 backdrop-blur-2xl border shadow-2xl ${
                  theme === "light"
                    ? "bg-white/90 border-black/10 shadow-black/20"
                    : "bg-black/90 border-white/10 shadow-white/20"
                }`}
              >
                <button
                  className={`absolute right-4 top-4 rounded-xl p-2 backdrop-blur-sm border transition-all duration-300 ${
                    theme === "light"
                      ? "text-black/60 bg-black/5 border-black/10 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-700"
                      : "text-white/60 bg-white/5 border-white/10 hover:bg-red-400/20 hover:border-red-400/30 hover:text-red-300"
                  }`}
                  onClick={() => setIsExpanded(false)}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-xl backdrop-blur-sm border ${
                        theme === "light"
                          ? "bg-black/5 border-black/10 text-black/80"
                          : "bg-white/5 border-white/10 text-white/80"
                      }`}
                    >
                      <StickyNote className="w-6 h-6" />
                    </div>
                    <h2
                      className={`text-2xl font-bold ${
                        theme === "light" ? "text-black" : "text-white"
                      }`}
                    >
                      Note
                    </h2>
                  </div>

                  <div
                    className={`rounded-xl p-6 backdrop-blur-sm border ${
                      theme === "light"
                        ? "bg-white/30 border-black/5"
                        : "bg-black/30 border-white/5"
                    }`}
                  >
                    <div
                      className={`whitespace-pre-wrap break-all leading-relaxed text-lg overflow-hidden ${
                        theme === "light" ? "text-black/80" : "text-white/80"
                      }`}
                    >
                      {getNoteContent() || ""}
                    </div>
                  </div>

                  {content.tags && content.tags.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {content.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-4 py-2 text-sm font-medium rounded-full backdrop-blur-sm border ${
                            theme === "light"
                              ? "bg-black/5 border-black/10 text-black/70"
                              : "bg-white/5 border-white/10 text-white/70"
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {formattedDate && (
                    <div
                      className={`text-sm ${
                        theme === "light" ? "text-black/50" : "text-white/50"
                      }`}
                    >
                      Created: {formattedDate}
                    </div>
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )}

        {/* Edit Modal (Still needed if user clicks expand -> edit within the modal logic? or we just support read only in compact) */}
        {/* Note: The standard card logic includes Edit button in the main view. In Compact view, we only show Read Only modal. To Edit, user would need to expand first, then maybe we add an edit button to the modal? 
          Actually NoteCard implementation (lines 100-107) puts CardActionButton in the main card. 
          The Expanded View (lines 175+) DOES NOT have an edit button. It assumes you edit from the card face?
          This is a UX gap in NoteCard logic generally.
          However, for SEARCH RESULTS, Read Only is acceptable behavior.
      */}
      </>
    );
  }

  return (
    <>
      <div className="relative group w-[280px] h-[240px] flex flex-col pb-7 transition-all duration-500">
        {/* Animated Action Button - Top right corner of the card */}
        <div className="absolute top-2 right-2 z-50 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <CardActionButton
            onExpand={() => setIsExpanded(true)}
            onShare={
              onUpdate && !isShared ? () => setIsEditing(true) : undefined
            }
            onDelete={!isShared && onDelete ? handleDelete : undefined}
            isValidLink={true}
            isShared={isShared}
            isEditMode={true}
          />
        </div>
        {/* Glass morphism container */}
        <div
          className={`absolute inset-0 rounded-2xl backdrop-blur-xl border transition-all duration-500 overflow-hidden ${
            theme === "light"
              ? "bg-white/60 border-black/10 shadow-lg shadow-black/5 group-hover:bg-white/80"
              : "bg-black/60 border-white/10 shadow-lg shadow-white/5 group-hover:bg-black/80"
          }`}
        />

        {/* Inner content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Note badge only */}
          <div className="p-3">
            <div
              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border transition-all duration-300 ${
                theme === "light"
                  ? "bg-purple-500/20 border-purple-500/30 text-purple-700"
                  : "bg-purple-400/20 border-purple-400/30 text-purple-300"
              }`}
            >
              <StickyNote className="w-3 h-3" />
              Note
            </div>
          </div>

          <div
            className={`p-4 sm:p-6 flex-1 overflow-y-auto transition-all duration-300 ${
              onUpdate && !isShared
                ? theme === "light"
                  ? "cursor-pointer hover:bg-black/5"
                  : "cursor-pointer hover:bg-white/5"
                : ""
            }`}
            onClick={() => {
              if (onUpdate && !isShared) setIsEditing(true);
            }}
          >
            <div
              className={`whitespace-pre-line break-words ${
                theme === "light" ? "text-black/70" : "text-white/70"
              }`}
            >
              <p className="text-sm leading-relaxed">{getNoteContent()}</p>
            </div>

            {content.tags && content.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {content.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`text-xs px-2 py-1 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                      theme === "light"
                        ? "bg-purple-500/20 border-purple-500/30 text-purple-700"
                        : "bg-purple-400/20 border-purple-400/30 text-purple-300"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {formattedDate && (
            <div
              className={`absolute bottom-3 right-3 text-[11px] select-none backdrop-blur-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                theme === "light"
                  ? "text-black/50 bg-white/30"
                  : "text-white/50 bg-black/30"
              }`}
            >
              {formattedDate}
            </div>
          )}
        </div>
      </div>

      {/* Expanded View via Portal */}
      {isExpanded &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsExpanded(false);
            }}
          >
            <div
              className={`relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 pb-8 backdrop-blur-2xl border shadow-2xl ${
                theme === "light"
                  ? "bg-white/90 border-black/10 shadow-black/20"
                  : "bg-black/90 border-white/10 shadow-white/20"
              }`}
            >
              <button
                className={`absolute right-4 top-4 rounded-xl p-2 backdrop-blur-sm border transition-all duration-300 ${
                  theme === "light"
                    ? "text-black/60 bg-black/5 border-black/10 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-700"
                    : "text-white/60 bg-white/5 border-white/10 hover:bg-red-400/20 hover:border-red-400/30 hover:text-red-300"
                }`}
                onClick={() => setIsExpanded(false)}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-xl backdrop-blur-sm border ${
                      theme === "light"
                        ? "bg-black/5 border-black/10 text-black/80"
                        : "bg-white/5 border-white/10 text-white/80"
                    }`}
                  >
                    <StickyNote className="w-6 h-6" />
                  </div>
                  <h2
                    className={`text-2xl font-bold ${
                      theme === "light" ? "text-black" : "text-white"
                    }`}
                  >
                    Note
                  </h2>
                </div>

                <div
                  className={`rounded-xl p-6 backdrop-blur-sm border ${
                    theme === "light"
                      ? "bg-white/30 border-black/5"
                      : "bg-black/30 border-white/5"
                  }`}
                >
                  <div
                    className={`whitespace-pre-wrap break-all leading-relaxed text-lg overflow-hidden ${
                      theme === "light" ? "text-black/80" : "text-white/80"
                    }`}
                  >
                    {getNoteContent() || ""}
                  </div>
                </div>

                {content.tags && content.tags.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {content.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-4 py-2 text-sm font-medium rounded-full backdrop-blur-sm border ${
                          theme === "light"
                            ? "bg-black/5 border-black/10 text-black/70"
                            : "bg-white/5 border-white/10 text-white/70"
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {formattedDate && (
                  <div
                    className={`text-sm ${
                      theme === "light" ? "text-black/50" : "text-white/50"
                    }`}
                  >
                    Created: {formattedDate}
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* Edit Modal */}
      {isEditing &&
        createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              // Close modal when clicking on the overlay
              if (e.target === e.currentTarget) {
                setIsEditing(false);
              }
            }}
          >
            <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <NoteEditor
                key={`editor-${content._id}`}
                initialTitle=""
                initialContent={getNoteContent()}
                onSave={handleSave}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
});
