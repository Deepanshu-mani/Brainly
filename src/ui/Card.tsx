import { useEffect, useState, useCallback, Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { createPortal } from "react-dom";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { LinkIcon } from "./icons/LinkIcon";
import { AlertTriangle, Maximize2, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import axios from "axios";
import { BACKEND_URL } from "../config";

// Error Boundary for Twitter Embeds
class TwitterEmbedErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Twitter embed error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Tweet could not be loaded</p>
        </div>
      );
    }

    return this.props.children;
  }
}

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
  link: string;
  type: "youtube" | "twitter";
  tags?: string[]; 
  onDelete?: () => void;
  isShared?: boolean;
  notes?: string;
  createdAt?: string;
}

export function Card({ id, link, type, tags, onDelete, isShared, notes, createdAt }: CardProps) {
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [summary, setSummary] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [sumLoading, setSumLoading] = useState(false);
  const [sumError, setSumError] = useState<string>("");
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
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
      <div className="relative group w-full transition-all duration-500">
        {/* Action buttons - positioned over content */}
        <div className={`absolute top-2 right-2 z-20 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
          theme === 'light' ? 'text-black/60' : 'text-white/60'
        }`}>
          <button 
            onClick={() => setIsExpanded(true)}
            className={`p-1.5 rounded-md backdrop-blur-sm border transition-all duration-300 ${
              theme === 'light'
                ? 'bg-white/80 border-black/10 hover:bg-purple-500/20 hover:text-purple-700'
                : 'bg-black/80 border-white/10 hover:bg-purple-400/20 hover:text-purple-300'
            }`}
            title="Expand"
            aria-label="Expand"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          {isValidLink ? (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`p-1.5 rounded-md backdrop-blur-sm border transition-all duration-300 ${
                theme === 'light'
                  ? 'bg-white/80 border-black/10 hover:bg-green-500/20 hover:text-green-700'
                  : 'bg-black/80 border-white/10 hover:bg-green-400/20 hover:text-green-300'
              }`}
              title="Open link"
              aria-label="Open link"
            >
              <LinkIcon />
            </a>
          ) : (
            <div className={`p-1.5 rounded-md backdrop-blur-sm border ${
              theme === 'light'
                ? 'bg-white/80 border-black/10 bg-red-500/20 text-red-700'
                : 'bg-black/80 border-white/10 bg-red-400/20 text-red-300'
            }`} title="Invalid link">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          )}
          {!isShared && onDelete && (
            <button 
              onClick={onDelete} 
              className={`p-1.5 rounded-md backdrop-blur-sm border transition-all duration-300 ${
                theme === 'light'
                  ? 'bg-white/80 border-black/10 hover:bg-red-500/20 hover:text-red-700'
                  : 'bg-black/80 border-white/10 hover:bg-red-400/20 hover:text-red-300'
              }`}
              title="Delete"
              aria-label="Delete"
            >
              <DeleteIcon />
            </button>
          )}
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

        {type === "youtube" && (
          <div>
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
          <div>
            <TwitterEmbedErrorBoundary>
              {isValidLink ? (
                <div 
                  key={`tweet-container-${link}`}
                  className="twitter-embed-container"
                  data-theme={isDark ? "dark" : "light"}
                >
                  <blockquote
                    className="twitter-tweet"
                    data-theme={isDark ? "dark" : "light"}
                  >
                    <a href={link.replace("x.com", "twitter.com")}></a>
                  </blockquote>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertTriangle className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-blue-700 font-medium">Invalid Twitter Link</p>
                  <p className="text-blue-600 text-sm mt-1">This tweet cannot be displayed due to an invalid URL</p>
                </div>
              )}
            </TwitterEmbedErrorBoundary>
          </div>
        )}
        {notes && (
          <div className="px-4 sm:px-6 py-2 text-sm text-gray-700 dark:text-dark-text-muted border-t border-gray-100 dark:border-dark-border">
            <p className="font-medium text-gray-800 dark:text-dark-text mb-1">📝 Note</p>
            <p>{notes}</p>
          </div>
        )}
        {formattedDate && (
          <div className={`absolute bottom-2 right-2 text-[11px] select-none backdrop-blur-sm px-2 py-1 rounded-lg ${
            theme === 'light' 
              ? 'text-black/50 bg-white/30' 
              : 'text-white/50 bg-black/30'
          }`}>
            {formattedDate}
          </div>
        )}
      </div>

      {isExpanded && createPortal(
        (
          <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsExpanded(false);
            }}
          >
            <div className={`relative z-0 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-2xl border shadow-2xl ${
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
              <div className="p-4">
                {type === 'youtube' ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl backdrop-blur-sm border ${
                        theme === 'light'
                          ? 'bg-black/5 border-black/10 text-black/80'
                          : 'bg-white/5 border-white/10 text-white/80'
                      }`}>
                        <YoutubeIcon />
                      </div>
                      <h2 className={`text-2xl font-bold ${
                        theme === 'light' ? 'text-black' : 'text-white'
                      }`}>Video</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            src={(link || '').replace("watch?v=", "embed/") + (link?.includes('embed/') ? '' : '')}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                          />
                        </div>
                      </div>
                      <div className={`lg:col-span-1 rounded-xl p-6 backdrop-blur-sm border ${
                        theme === 'light'
                          ? 'bg-white/30 border-black/5'
                          : 'bg-black/30 border-white/5'
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className={`text-lg font-semibold ${
                            theme === 'light' ? 'text-black' : 'text-white'
                          }`}>AI Summary</h3>
                          <button
                            onClick={() => fetchSummary(true)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                              theme === 'light'
                                ? 'bg-purple-600 text-white hover:bg-purple-700'
                                : 'bg-purple-500 text-white hover:bg-purple-600'
                            } disabled:opacity-60`}
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
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl backdrop-blur-sm border ${
                        theme === 'light'
                          ? 'bg-black/5 border-black/10 text-black/80'
                          : 'bg-white/5 border-white/10 text-white/80'
                      }`}>
                        <TwitterIcon />
                      </div>
                      <h2 className={`text-2xl font-bold ${
                        theme === 'light' ? 'text-black' : 'text-white'
                      }`}>{type === 'twitter' ? 'Tweet' : 'Video'}</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className={`rounded-xl p-4 backdrop-blur-sm border ${
                          theme === 'light'
                            ? 'bg-white/30 border-black/5'
                            : 'bg-black/30 border-white/5'
                        }`}>
                          <TwitterEmbedErrorBoundary>
                            {isValidLink ? (
                              <div 
                                key={`tweet-expanded-container-${link}`}
                                className="twitter-embed-container"
                                data-theme={isDark ? 'dark' : 'light'}
                              >
                                <blockquote
                                  className="twitter-tweet"
                                  data-theme={isDark ? 'dark' : 'light'}
                                >
                                  <a href={(link || '').replace('x.com', 'twitter.com')}></a>
                                </blockquote>
                              </div>
                            ) : (
                              <div className={`rounded-lg p-6 text-center ${
                                theme === 'light'
                                  ? 'bg-blue-50 border border-blue-200'
                                  : 'bg-blue-900/20 border border-blue-800/50'
                              }`}>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                                  theme === 'light' ? 'bg-blue-100' : 'bg-blue-800/50'
                                }`}>
                                  <AlertTriangle className={`w-6 h-6 ${
                                    theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                                  }`} />
                                </div>
                                <p className={`font-medium ${
                                  theme === 'light' ? 'text-blue-700' : 'text-blue-300'
                                }`}>Invalid Twitter Link</p>
                                <p className={`text-sm mt-1 ${
                                  theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                                }`}>This tweet cannot be displayed due to an invalid URL</p>
                              </div>
                            )}
                          </TwitterEmbedErrorBoundary>
                        </div>
                      </div>
                      <div className={`lg:col-span-1 rounded-xl p-6 backdrop-blur-sm border ${
                        theme === 'light'
                          ? 'bg-white/30 border-black/5'
                          : 'bg-black/30 border-white/5'
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className={`text-lg font-semibold ${
                            theme === 'light' ? 'text-black' : 'text-white'
                          }`}>AI Summary</h3>
                          <button
                            onClick={() => fetchSummary(true)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                              theme === 'light'
                                ? 'bg-purple-600 text-white hover:bg-purple-700'
                                : 'bg-purple-500 text-white hover:bg-purple-600'
                            } disabled:opacity-60`}
                            disabled={sumLoading}
                          >
                            {sumLoading ? 'Loading…' : 'Refresh'}
                          </button>
                        </div>
                        {isShared ? (
                          <p className={`text-sm ${
                            theme === 'light' ? 'text-black/60' : 'text-white/60'
                          }`}>Sign in to view AI summary.</p>
                        ) : sumError ? (
                          <p className={`text-sm ${
                            theme === 'light' ? 'text-red-600' : 'text-red-400'
                          }`}>{sumError}</p>
                        ) : sumLoading && !summary ? (
                          <p className={`text-sm ${
                            theme === 'light' ? 'text-black/60' : 'text-white/60'
                          }`}>Generating summary…</p>
                        ) : summary ? (
                          <div className="space-y-4">
                            <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                              theme === 'light' ? 'text-black/80' : 'text-white/80'
                            }`}>{summary}</p>
                            {keywords && keywords.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {keywords.map((k, i) => (
                                  <span key={i} className={`text-xs px-3 py-1 rounded-full backdrop-blur-sm border ${
                                    theme === 'light'
                                      ? 'bg-black/5 border-black/10 text-black/70'
                                      : 'bg-white/5 border-white/10 text-white/70'
                                  }`}>#{k}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className={`text-sm ${
                            theme === 'light' ? 'text-black/60' : 'text-white/60'
                          }`}>No summary yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {formattedDate && (
                  <div className={`text-sm ${
                    theme === 'light' ? 'text-black/50' : 'text-white/50'
                  }`}>
                    Created: {formattedDate}
                  </div>
                )}
              </div>
            </div>
          </div>
        ),
        document.body
      )}
    </>
  );
}
