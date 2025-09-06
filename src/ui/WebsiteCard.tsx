import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { WebsiteContent } from "../types/content";
import { LinkIcon } from "./icons/LinkIcon";
import { X, Globe } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { CardActionButton } from "../components/SocialButton";

interface WebsiteCardProps {
  content: WebsiteContent;
  onDelete?: () => void;
  isShared?: boolean;
}

export const WebsiteCard = React.memo(function WebsiteCard({ content, onDelete, isShared }: WebsiteCardProps) {
  const { link, websiteMetadata, summary, tags, processingStatus } = content;
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();
  
  // Close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    if (isExpanded) {
      document.addEventListener('keydown', onKeyDown);
    }
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isExpanded]);

  const domain = useMemo(() => {
    try {
      return websiteMetadata?.domain || new URL(link).hostname;
    } catch {
      return websiteMetadata?.domain || "";
    }
  }, [websiteMetadata?.domain, link]);

  const description = useMemo(() => {
    if (processingStatus === "processing") {
      return "Processing with AI… extracting summary and keywords";
    }
    return (summary && summary.trim()) || websiteMetadata?.description || "";
  }, [processingStatus, summary, websiteMetadata?.description]);

  const favicon = websiteMetadata?.favicon;

  const createdAt = (content as any)?.createdAt || (content as any)?.updatedAt;
  const formattedDate = useMemo(() => {
    if (!createdAt) return '';
    const d = new Date(createdAt);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }, [createdAt]);

  return (
    <>
    <div 
      className="relative group flex w-full flex-col overflow-hidden pb-7 transition-all duration-500 hover:z-10 cursor-pointer"
      onClick={() => {
        if (link) {
          window.open(link, '_blank');
        }
      }}
    >
      {/* Animated Action Button - Top right corner of the card */}
      <div 
        className="absolute top-2 right-2 z-50 opacity-0 group-hover:opacity-100 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <CardActionButton
          onExpand={() => setIsExpanded(true)}
          onShare={link ? () => window.open(link, '_blank') : undefined}
          onDelete={!isShared && onDelete ? onDelete : undefined}
          isValidLink={!!link}
          isShared={isShared}
        />
      </div>
      {/* Glass morphism container */}
      <div className={`absolute inset-0 rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
        theme === 'light' 
          ? 'bg-white/60 border-black/10 shadow-lg shadow-black/5 group-hover:bg-white/80 group-hover:shadow-xl group-hover:shadow-black/10' 
          : 'bg-black/60 border-white/10 shadow-lg shadow-white/5 group-hover:bg-black/80 group-hover:shadow-xl group-hover:shadow-white/10'
      }`} />
      
      {/* Inner content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Website badge only */}
        <div className="p-3">
          <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border transition-all duration-300 ${
            theme === 'light'
              ? 'bg-blue-500/20 border-blue-500/30 text-blue-700'
              : 'bg-blue-400/20 border-blue-400/30 text-blue-300'
          }`}>
            <Globe className="w-3 h-3" />
            Website
          </div>
        </div>

      {processingStatus && processingStatus !== "completed" && (
        <div className="mx-4 mt-3 rounded-md bg-purple-50 text-purple-700 text-xs px-3 py-2 border border-purple-200 dark:bg-dark-primary/10 dark:text-dark-primary dark:border-dark-border">
          {processingStatus === "processing" ? "Processing with AI…" : processingStatus === "failed" ? "Processing failed" : "Pending processing"}
        </div>
      )}

      <div className={`px-4 sm:px-6 py-3 cursor-pointer transition-all duration-300 hover:bg-opacity-50 ${
        theme === 'light' ? 'hover:bg-black/5' : 'hover:bg-white/5'
      }`} onClick={() => setIsExpanded(true)}>
        <p className={`text-sm line-clamp-5 whitespace-pre-line leading-relaxed ${
          theme === 'light' ? 'text-black/70' : 'text-white/70'
        }`}>
          {description || "No summary available yet."}
        </p>

        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm border transition-all duration-300 ${
                  theme === 'light'
                    ? 'bg-purple-500/20 border-purple-500/30 text-purple-700'
                    : 'bg-purple-400/20 border-purple-400/30 text-purple-300'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {formattedDate && (
        <div className={`absolute bottom-3 right-3 text-[11px] select-none backdrop-blur-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ${
          theme === 'light' 
            ? 'text-black/50 bg-white/30' 
            : 'text-white/50 bg-black/30'
        }`}>
          {formattedDate}
        </div>
      )}
      </div>
    </div>

    {/* Expanded View Portal */}
    {isExpanded && createPortal(
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsExpanded(false)}
        />

        {/* Modal content - full screen */}
        <div className={`relative z-0 w-[70vw] max-w-4xl mx-auto rounded-2xl mt-8 h-[75vh] overflow-y-auto pb-6 backdrop-blur-2xl border shadow-2xl ${
          theme === 'light' 
            ? 'bg-white/90 border-black/10 shadow-black/20' 
            : 'bg-black/90 border-white/10 shadow-white/20'
        }`}>
          <button
            className={`absolute right-4 top-4 z-50 rounded-xl p-2 backdrop-blur-sm border transition-all duration-300 ${
              theme === 'light'
                ? 'text-black/60 bg-black/5 border-black/10 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-700'
                : 'text-white/60 bg-white/5 border-white/10 hover:bg-red-400/20 hover:border-red-400/30 hover:text-red-300'
            }`}
            onClick={() => setIsExpanded(false)}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-4 sm:p-5 max-w-4xl mx-auto">
            <div className="flex items-start gap-3 mb-6">
              <div className={`p-3 rounded-xl backdrop-blur-sm border ${
                theme === 'light' 
                  ? 'bg-black/5 border-black/10 text-black/80' 
                  : 'bg-white/5 border-white/10 text-white/80'
              }`}>
                {favicon ? (
                  <img src={favicon} alt="favicon" className="w-6 h-6 rounded-sm" />
                ) : (
                  <LinkIcon />
                )}
              </div>
              <div className="min-w-0">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm border transition-all duration-300 ${
                  theme === 'light'
                    ? 'bg-blue-500/20 border-blue-500/30 text-blue-700'
                    : 'bg-blue-400/20 border-blue-400/30 text-blue-300'
                }`}>
                  <Globe className="w-4 h-4" />
                  Website
                </div>
                {domain && (
                  <p className={`text-sm truncate mt-2 ${
                    theme === 'light' ? 'text-black/60' : 'text-white/60'
                  }`}>{domain}</p>
                )}
              </div>
            </div>


            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${
                  theme === 'light' ? 'text-black' : 'text-white'
                }`}>Summary</h3>
                <div className={`rounded-xl p-6 backdrop-blur-sm border ${
                  theme === 'light'
                    ? 'bg-white/30 border-black/5'
                    : 'bg-black/30 border-white/5'
                }`}>
                  <p className={`whitespace-pre-line ${
                    theme === 'light' ? 'text-black/80' : 'text-white/80'
                  }`}>
                    {description || "No summary available yet."}
                  </p>
                </div>
              </div>
              {tags && tags.length > 0 && (
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === 'light' ? 'text-black' : 'text-white'
                  }`}>Tags</h3>
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 text-sm font-medium rounded-full backdrop-blur-sm border ${
                          theme === 'light'
                            ? 'bg-black/5 border-black/10 text-black/70'
                            : 'bg-white/5 border-white/10 text-white/70'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {formattedDate && (
            <div className={`text-sm ${
              theme === 'light' ? 'text-black/50' : 'text-white/50'
            }`}>
              Bookmarked: {formattedDate}
            </div>
          )}
        </div>
      </div>,
      document.body
    )}
    </>
  );
});
