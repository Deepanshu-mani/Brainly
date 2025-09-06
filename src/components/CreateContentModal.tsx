import { X, Youtube, Twitter, Globe, StickyNote } from "lucide-react";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { showToast } from "../utils/toast";
import { Button } from "../ui/Button";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Website = "website",
  Note = "note"
}

export function CreateContentModal({ open, onClose }: {
    open: boolean,
    onClose: () => void 
}) {
  const linkRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  const [loading, setLoading] = useState(false);

  const contentTypes = [
    { key: ContentType.Youtube, label: "YouTube", icon: Youtube, color: "text-red-500" },
    { key: ContentType.Twitter, label: "Twitter", icon: Twitter, color: "text-blue-500" },
    { key: ContentType.Website, label: "Website", icon: Globe, color: "text-emerald-500" },
    { key: ContentType.Note, label: "Note", icon: StickyNote, color: "text-yellow-500" }
  ];

  async function addContent() {
    const addingToast = showToast.loading(`Adding ${type}...`);
    setLoading(true);
    try {
      const link = linkRef.current?.value;
      const content = contentRef.current?.value;
      const tagsRaw = tagsRef.current?.value || "";
      const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);

      const payload: any = {
        type,
        tags
      };

      // Add content for Notes (no title)
      if (type === ContentType.Note) {
        payload.content = content;
      } else {
        // Add link for YouTube, Twitter, and Website
        payload.link = link;
      }

      await axios.post(`${BACKEND_URL}/content`, payload, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
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
              {/* Content Type Selection */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  {contentTypes.map((contentType) => {
                    const Icon = contentType.icon;
                    const isSelected = type === contentType.key;
                    return (
                      <button
                        key={contentType.key}
                        onClick={() => setType(contentType.key)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                          isSelected
                            ? 'bg-white text-black border-white'
                            : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-black' : contentType.color}`} />
                        <span className="text-sm font-medium">{contentType.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>


              {/* Link/Content Input */}
              {[ContentType.Youtube, ContentType.Twitter, ContentType.Website].includes(type) && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 block">
                    {type === ContentType.Website ? 'Website or Tweet URL' : 'Link'}
                  </label>
                  <input
                    ref={linkRef}
                    type="url"
                    placeholder="Paste your link here"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all duration-200 text-sm"
                  />
                </div>
              )}

              {/* Content (for Notes) */}
              {type === ContentType.Note && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 block">Note</label>
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
                <label className="text-sm font-medium text-white/80 block">Tags</label>
                <input
                  ref={tagsRef}
                  type="text"
                  placeholder="Comma-separated tags (e.g. tech, ai)"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all duration-200 text-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="flex-1"
                >
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