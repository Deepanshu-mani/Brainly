import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { LinkIcon } from "./icons/LinkIcon";
import { EditIcon } from "./icons/EditIcon";
import { AlertTriangle, Maximize2, X } from "lucide-react";
import { UpdateContentModal, ContentType } from "../components/UpdateContentModal";
import axios from "axios";
import { BACKEND_URL } from "../config";

const isValidUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

interface CardProps {
  id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter";
  tags?: string[]; 
  onDelete?: () => void;
  isShared?: boolean;
  notes?: string;
  createdAt?: string;
}

export function Card({ id, title, link, type, tags, onDelete, isShared, notes, createdAt }: CardProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [summary, setSummary] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [sumLoading, setSumLoading] = useState(false);
  const [sumError, setSumError] = useState<string>("");
  const handleEditClick = () => setIsEditModalOpen(true);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (type === "twitter" && mounted && window.twttr?.widgets) {
      window.twttr.widgets.load();
    }
  }, [link, type, mounted, isDark]);

  // Close expanded view on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    if (isExpanded) {
      document.addEventListener('keydown', onKeyDown);
      if (type === 'twitter' && window.twttr?.widgets) {
        // ensure tweet renders inside modal
        setTimeout(() => window.twttr?.widgets?.load(), 0);
      }
    }
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isExpanded, type]);

  // Lock body scroll while expanded
  useEffect(() => {
    if (isExpanded) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [isExpanded]);

  const isValidLink = isValidUrl(link);

  const fetchSummary = useCallback(async (force = false) => {
    if (!id || isShared) return;
    setSumError("");
    setSumLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/content/${id}/summary`, {
        params: { force },
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });
      setSummary(res.data.summary || "");
      setKeywords(Array.isArray(res.data.keywords) ? res.data.keywords : []);
    } catch (e: any) {
      setSumError(e?.response?.data?.message || "Failed to load summary");
    } finally {
      setSumLoading(false);
    }
  }, [id, isShared]);

  // Load summary when expanding a Twitter or YouTube card
  useEffect(() => {
    if (isExpanded && (type === 'twitter' || type === 'youtube') && !isShared) {
      fetchSummary(false);
    }
  }, [isExpanded, type, isShared, fetchSummary]);

  const formattedDate = createdAt ? (() => {
    const d = new Date(createdAt);
    return isNaN(d.getTime()) ? '' : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  })() : '';

  return (
    <>
      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 flex w-full flex-col overflow-hidden hover:shadow-xl transition-all duration-300 dark:bg-dark-surface/90 dark:border-dark-border dark:shadow-2xl pb-7">
        <div className="flex px-4 sm:px-6 py-3 sm:py-4 justify-between items-center bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 dark:from-dark-surface dark:to-dark-surface-alt dark:border-dark-border">
          <div className="text-gray-700 flex items-center gap-2 sm:gap-3 font-medium min-w-0 flex-1 dark:text-dark-text">
            <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${type === "twitter" ? "bg-blue-100 dark:bg-white/10  dark:text-black" : "bg-red-100"}`}>
              {type === "twitter" ? <TwitterIcon /> : <YoutubeIcon />}
            </div>
            <span className="truncate text-sm sm:text-base">{title}</span>
          </div>
          
          <div className="flex text-gray-500 gap-2 sm:gap-3 flex-shrink-0 dark:text-dark-text-muted">
            <button 
              onClick={() => setIsExpanded(true)}
              className="hover:text-purple-600 transition-colors p-1 dark:hover:text-dark-primary"
              title="Expand"
              aria-label="Expand"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            {!isShared && (
              <button 
                onClick={handleEditClick} 
                className="hover:text-blue-500 transition-colors p-1 dark:hover:text-dark-primary"
              >
                <EditIcon />
              </button>
            )}
            {isValidLink ? (
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-purple-600 transition-colors p-1 dark:hover:text-dark-primary"
              >
                <LinkIcon />
              </a>
            ) : (
              <div className="p-1 text-red-500 dark:text-red-400" title="Invalid link">
                <AlertTriangle className="w-4 h-4" />
              </div>
            )}
            {!isShared && onDelete && (
              <button 
                onClick={onDelete} 
                className="hover:text-red-500 transition-colors p-1 dark:hover:text-dark-error"
              >
                <DeleteIcon />
              </button>
            )}
          </div>
        </div>
        
        {!isValidLink && (
          <div className="bg-red-100/80 border-l-4 border-red-500 text-red-700 p-3 mx-4 my-2 rounded text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>This content has an invalid or missing link</span>
          </div>
        )}
          
        {tags && tags.length > 0 && (
          <div className="px-4 sm:px-6 pt-2 flex flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-purple-600/10 text-purple-700 px-3 py-1 text-xs font-medium rounded-full dark:bg-purple-500/20 dark:text-purple-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {type === "youtube" && (
          <div className="p-3 sm:p-4">
            {isValidLink ? (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={link.replace("watch?v=", "embed/")}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                />
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-red-700 font-medium">Invalid YouTube Link</p>
                <p className="text-red-600 text-sm mt-1">This video cannot be displayed due to an invalid URL</p>
              </div>
            )}
          </div>
        )}

        {type === "twitter" && mounted && (
          <div className="p-3 sm:p-4">
            {isValidLink ? (
              <blockquote
                className="twitter-tweet"
                key={`tweet-${isDark ? "dark" : "light"}-${link}`}
                data-theme={isDark ? "dark" : "light"}
              >
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-blue-700 font-medium">Invalid Twitter Link</p>
                <p className="text-blue-600 text-sm mt-1">This tweet cannot be displayed due to an invalid URL</p>
              </div>
            )}
          </div>
        )}
        {notes && (
          <div className="px-4 sm:px-6 py-2 text-sm text-gray-700 dark:text-dark-text-muted border-t border-gray-100 dark:border-dark-border">
            <p className="font-medium text-gray-800 dark:text-dark-text mb-1">📝 Note</p>
            <p>{notes}</p>
          </div>
        )}
        {formattedDate && (
          <div className="absolute bottom-3 right-3 text-[11px] text-gray-500 dark:text-dark-text-muted select-none">
            {formattedDate}
          </div>
        )}
      </div>
      <UpdateContentModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        contentId={id}
        initialTitle={title}
        initialLink={link}  
        initialType={type as ContentType}
        onOpen={() => console.log("Update modal opened")}
      />

      {isExpanded && createPortal(
        (
          <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsExpanded(false);
            }}
          >
            <div className="relative z-0 w-full max-w-5xl max-h-[100vh] pb-8">
              <button
                className="absolute right-2 top-2 z-50 text-white/90 hover:text-white bg-black/40 rounded-full p-1"
                onClick={() => setIsExpanded(false)}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              {type === 'youtube' ? (
                <div
                  className="bg-white dark:bg-dark-surface rounded-lg p-0 md:p-4 max-h-[92vh] overflow-y-auto overscroll-contain"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4">
                    <div className="lg:col-span-2 p-0 lg:p-4">
                      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          src={(link || '').replace("watch?v=", "embed/") + (link?.includes('embed/') ? '' : '')}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          className="absolute top-0 left-0 w-full h-full rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-dark-border p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-dark-text">AI Summary</h3>
                        <button
                          onClick={() => fetchSummary(true)}
                          className="text-xs px-2 py-1 rounded-md bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-60"
                          disabled={sumLoading}
                        >
                          {sumLoading ? 'Loading…' : 'Refresh'}
                        </button>
                      </div>
                      {isShared ? (
                        <p className="text-xs text-gray-500">Sign in to view AI summary.</p>
                      ) : sumError ? (
                        <p className="text-xs text-red-500">{sumError}</p>
                      ) : sumLoading && !summary ? (
                        <p className="text-xs text-gray-500">Generating summary…</p>
                      ) : summary ? (
                        <>
                          <p className="text-sm text-gray-800 dark:text-dark-text leading-relaxed whitespace-pre-wrap">{summary}</p>
                          {keywords && keywords.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {keywords.map((k, i) => (
                                <span key={i} className="text-[11px] px-2 py-1 rounded-full bg-purple-600/10 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">#{k}</span>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-xs text-gray-500">No summary yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="bg-white dark:bg-dark-surface rounded-lg p-0 md:p-4 max-h-[92vh] overflow-y-auto overscroll-contain"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4">
                    <div className="lg:col-span-2 p-4">
                      {isValidLink ? (
                        <blockquote
                          className="twitter-tweet"
                          key={`tweet-expanded-${isDark ? 'dark' : 'light'}-${link}`}
                          data-theme={isDark ? 'dark' : 'light'}
                        >
                          <a href={(link || '').replace('x.com', 'twitter.com')}></a>
                        </blockquote>
                      ) : (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <AlertTriangle className="w-6 h-6 text-blue-600" />
                          </div>
                          <p className="text-blue-700 font-medium">Invalid Twitter Link</p>
                          <p className="text-blue-600 text-sm mt-1">This tweet cannot be displayed due to an invalid URL</p>
                        </div>
                      )}
                    </div>
                    <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-dark-border p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-dark-text">AI Summary</h3>
                        <button
                          onClick={() => fetchSummary(true)}
                          className="text-xs px-2 py-1 rounded-md bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-60"
                          disabled={sumLoading}
                        >
                          {sumLoading ? 'Loading…' : 'Refresh'}
                        </button>
                      </div>
                      {isShared ? (
                        <p className="text-xs text-gray-500">Sign in to view AI summary.</p>
                      ) : sumError ? (
                        <p className="text-xs text-red-500">{sumError}</p>
                      ) : sumLoading && !summary ? (
                        <p className="text-xs text-gray-500">Generating summary…</p>
                      ) : summary ? (
                        <>
                          <p className="text-sm text-gray-800 dark:text-dark-text leading-relaxed whitespace-pre-wrap">{summary}</p>
                          {keywords && keywords.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {keywords.map((k, i) => (
                                <span key={i} className="text-[11px] px-2 py-1 rounded-full bg-purple-600/10 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">#{k}</span>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-xs text-gray-500">No summary yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {formattedDate && (
                <div className="absolute bottom-9 right-4 text-xs text-white/80 md:text-gray-600 md:dark:text-dark-text-muted md:text-[11px]">
                  {formattedDate}
                </div>
              )}
            </div>
          </div>
        ),
        document.body
      )}
    </>
  );
}
