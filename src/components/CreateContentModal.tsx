import { CrossIcon } from "../ui/icons/CrossIcon";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter"
}

export function CreateContentModal({ open, onClose }: {
    open: boolean,
    onClose: () => void
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  const [loading, setLoading] = useState(false);

  async function addContent() {
    setLoading(true);
    try {
      const title = titleRef.current?.value;
      const link = linkRef.current?.value;
      const tagsRaw = tagsRef.current?.value || "";
      // Expecting plain tag strings like ["tech", "ai"]
      const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);

      await axios.post(`${BACKEND_URL}/content`, {
        link,
        title,
        type,
        tags
      }, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      onClose();
    } catch (error) {
      console.error("Failed to add content:", error);
      alert("Failed to add content. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50 p-4 dark:bg-black/70">
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6 sm:p-8 w-full max-w-md mx-4 dark:bg-dark-surface/95 dark:border-dark-border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent dark:from-dark-primary dark:to-dark-primary-hover">
                Add Content
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 dark:text-dark-text-muted dark:hover:text-dark-text">
                <CrossIcon />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block dark:text-dark-text">Title</label>
                <Input placeholder="Enter content title" reference={titleRef} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block dark:text-dark-text">Link</label>
                <Input placeholder="Paste your link here" reference={linkRef} />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 block dark:text-dark-text">Content Type</label>
                <div className="flex gap-2 sm:gap-3">
                  <Button 
                    text="YouTube" 
                    variant={type === ContentType.Youtube ? "primary" : "secondary"}  
                    onClick={() => setType(ContentType.Youtube)}
                  /> 
                  <Button 
                    text="Twitter" 
                    variant={type === ContentType.Twitter ? "primary" : "secondary"} 
                    onClick={() => setType(ContentType.Twitter)} 
                  />   
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block dark:text-dark-text">Tags</label>
                <Input placeholder="Comma-separated tags (e.g. tech, ai)" reference={tagsRef} />
              </div>

              <div className="pt-4">
                <Button 
                  variant="primary" 
                  text={loading ? "Adding..." : "Add Content"} 
                  fullWidth={true} 
                  loading={loading}
                  onClick={addContent} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}