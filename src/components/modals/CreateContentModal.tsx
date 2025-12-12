import { X, Globe, StickyNote } from "lucide-react";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { showToast } from "../../utils/toast";
import { Button } from "../../ui/Button";
import { detectContentType } from "../../utils/contentTypeDetector";

import type { ContentType } from "../../types/content";

export function CreateContentModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const linkRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>("website");
  const [loading, setLoading] = useState(false);
  const [isAutoDetected, setIsAutoDetected] = useState(false);

  // Auto-detect content type from URL
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    const detectedType = detectContentType(url);

    if (detectedType) {
      setType(detectedType as ContentType);
      setIsAutoDetected(true);
    }
  };

  async function addContent() {
    const addingToast = showToast.loading(`Adding ${type}...`);
    setLoading(true);
    try {
      const link = linkRef.current?.value;
      const content = contentRef.current?.value;
      const tagsRaw = tagsRef.current?.value || "";
      const tags = tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload: {
        type: string;
        tags: string[];
        link?: string;
        content?: string;
      } = {
        type,
        tags,
      };

      // Add content for Notes (no title)
      if (type === "note") {
        payload.content = content;
      } else {
        // Add link for YouTube, Twitter, and Website
        payload.link = link;
      }

      await axios.post(`${BACKEND_URL}/content`, payload, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      showToast.dismiss(addingToast);
      showToast.contentAdded(type.charAt(0).toUpperCase() + type.slice(1));
      onClose();
    } catch (error) {
      console.error("Failed to add content:", error);
      showToast.dismiss(addingToast);
      showToast.error("Failed to add content. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-black/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-4 sm:p-6 w-full max-w-lg mx-2 sm:mx-4">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                + Add Memory
              </h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Simple Link/Note Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setType("website");
                    setIsAutoDetected(false);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-200 ${
                    type !== "note"
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Globe
                    className={`w-4 h-4 ${type !== "note" ? "text-black" : "text-emerald-500"}`}
                  />
                  <span className="text-sm font-medium">Link</span>
                  <span className="text-xs opacity-60">(Auto-detect)</span>
                </button>
                <button
                  onClick={() => {
                    setType("note");
                    setIsAutoDetected(false);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-200 ${
                    type === "note"
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <StickyNote
                    className={`w-4 h-4 ${type === "note" ? "text-black" : "text-yellow-500"}`}
                  />
                  <span className="text-sm font-medium">Note</span>
                </button>
              </div>

              {/* Link/Content Input */}
              {["youtube", "twitter", "website"].includes(type) && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-white/80 block">
                      {type === "website" ? "Website or Tweet URL" : "Link"}
                    </label>
                    {isAutoDetected && (
                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                        Auto-detected
                      </span>
                    )}
                  </div>
                  <input
                    ref={linkRef}
                    type="url"
                    placeholder="Paste your link here - type will be auto-detected"
                    onChange={handleUrlChange}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all duration-200 text-sm"
                  />
                </div>
              )}

              {/* Content (for Notes) */}
              {type === "note" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 block">
                    Note
                  </label>
                  <textarea
                    ref={contentRef}
                    placeholder="Add your note"
                    rows={3}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all duration-200 resize-none text-sm"
                  />
                </div>
              )}

              {/* Tags */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80 block">
                  Tags
                </label>
                <input
                  ref={tagsRef}
                  type="text"
                  placeholder="Comma-separated tags (e.g. tech, ai)"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all duration-200 text-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button variant="ghost" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={addContent}
                  disabled={loading}
                  loading={loading}
                  className="flex-1"
                >
                  Add Memory
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
