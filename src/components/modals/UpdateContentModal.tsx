import { CrossIcon } from "../../ui/icons/CrossIcon";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

import type { ContentType } from "../../types/content";

export function UpdateContentModal({
  open,
  onClose,
  onOpen,
  contentId,
  initialTitle,
  initialLink,
  initialType,
}: {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  contentId: string;
  initialTitle: string;
  initialLink: string;
  initialType: ContentType;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type] = useState<ContentType>(initialType);
  const [loading, setLoading] = useState(false);
  const [tags] = useState<string[]>([]);
  const tagsRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      if (onOpen) onOpen();
      console.log("Update modal opened with contentId:", contentId);
    }
  }, [open, onOpen, contentId]);

  async function updateContent() {
    setLoading(true);
    try {
      const title = titleRef.current?.value;
      const link = linkRef.current?.value;
      const tagsValue =
        tagsRef.current?.value
          ?.split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0) || [];

      await axios.put(
        `${BACKEND_URL}/content/${contentId}`,
        {
          title,
          link,
          type,
          tags: tagsValue,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      onClose();
    } catch (error) {
      console.error("Failed to update content:", error);
      alert("Failed to update content. Please try again.");
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
                Update Content
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 dark:text-dark-text-muted dark:hover:text-dark-text"
              >
                <CrossIcon />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block dark:text-dark-text">
                  Title
                </label>
                <Input
                  placeholder="Enter content title"
                  reference={titleRef}
                  defaultValue={initialTitle}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block dark:text-dark-text">
                  Link
                </label>
                <Input
                  placeholder="Paste your link here"
                  reference={linkRef}
                  defaultValue={initialLink}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block dark:text-dark-text">
                  Content Type
                </label>
                <p className="text-sm text-gray-800 dark:text-dark-text-muted capitalize">
                  {type}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block dark:text-dark-text">
                  Tags (comma separated)
                </label>
                <Input
                  placeholder="e.g. react, typescript, ai"
                  reference={tagsRef}
                  defaultValue={tags.join(", ")}
                />
              </div>

              <div className="pt-4">
                <Button
                  variant="primary"
                  className="w-full"
                  loading={loading}
                  onClick={updateContent}
                >
                  {loading ? "Updating..." : "Update Content"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
