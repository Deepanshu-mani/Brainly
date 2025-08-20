import { useMemo } from "react";
import type { WebsiteContent } from "../types/content";
import { LinkIcon } from "./icons/LinkIcon";
import { DeleteIcon } from "./icons/DeleteIcon";

interface WebsiteCardProps {
  content: WebsiteContent;
  onDelete?: () => void;
  isShared?: boolean;
}

export function WebsiteCard({ content, onDelete, isShared }: WebsiteCardProps) {
  const { title, link, websiteMetadata, summary, tags, processingStatus } = content;

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

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 flex w-full flex-col overflow-hidden hover:shadow-xl transition-all duration-300 dark:bg-dark-surface/90 dark:border-dark-border dark:shadow-2xl">
      <div className="flex px-4 sm:px-6 py-3 sm:py-4 justify-between items-center bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 dark:from-dark-surface dark:to-dark-surface-alt dark:border-dark-border">
        <div className="text-gray-700 flex items-center gap-3 font-medium min-w-0 flex-1 dark:text-dark-text">
          <div className="p-1.5 sm:p-2 rounded-lg flex-shrink-0 bg-purple-100 dark:bg-white/10">
            {favicon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={favicon} alt="favicon" className="w-4 h-4 rounded-sm" />
            ) : (
              <LinkIcon />
            )}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm sm:text-base">{title || domain || "Website"}</div>
            {domain && (
              <div className="text-xs text-gray-500 truncate dark:text-dark-text-muted">{domain}</div>
            )}
          </div>
        </div>

        <div className="flex text-gray-500 gap-2 sm:gap-3 flex-shrink-0 dark:text-dark-text-muted">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-600 transition-colors p-1 dark:hover:text-dark-primary"
              aria-label="Open website"
            >
              <LinkIcon />
            </a>
          )}
          {!isShared && onDelete && (
            <button
              onClick={onDelete}
              className="hover:text-red-500 transition-colors p-1 dark:hover:text-dark-error"
              aria-label="Delete bookmark"
            >
              <DeleteIcon />
            </button>
          )}
        </div>
      </div>

      {processingStatus && processingStatus !== "completed" && (
        <div className="mx-4 mt-3 rounded-md bg-purple-50 text-purple-700 text-xs px-3 py-2 border border-purple-200 dark:bg-dark-primary/10 dark:text-dark-primary dark:border-dark-border">
          {processingStatus === "processing" ? "Processing with AI…" : processingStatus === "failed" ? "Processing failed" : "Pending processing"}
        </div>
      )}

      <div className="px-4 sm:px-6 py-3">
        <p className="text-sm text-gray-700 dark:text-dark-text-muted line-clamp-5 whitespace-pre-line">
          {description || "No summary available yet."}
        </p>

        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-purple-600/10 text-purple-700 px-3 py-1 text-xs font-medium rounded-full dark:bg-purple-500/20 dark:text-purple-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


