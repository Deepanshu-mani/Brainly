import { CrossIcon } from "../../ui/icons/CrossIcon";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { LinkIcon } from "../../ui/icons/LinkIcon";

export function BookmarkWebsiteModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const urlRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<
    "idle" | "processing" | "completed" | "error"
  >("idle");

  async function bookmarkWebsite() {
    const url = urlRef.current?.value;

    if (!url) {
      alert("Please enter a URL");
      return;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setLoading(true);
    setProcessingStatus("processing");

    try {
      await axios.post(
        `${BACKEND_URL}/content/bookmark`,
        {
          url: url,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      setProcessingStatus("completed");
      setTimeout(() => {
        onClose();
        setProcessingStatus("idle");
      }, 1500);
    } catch (error: unknown) {
      console.error("Failed to bookmark website:", error);
      setProcessingStatus("error");
      let message = "Failed to bookmark website. Please try again.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      alert(message);
    } finally {
      setLoading(false);
    }
  }

  const getStatusMessage = () => {
    switch (processingStatus) {
      case "processing":
        return "Processing website with AI...";
      case "completed":
        return "Website bookmarked successfully!";
      case "error":
        return "Failed to process website";
      default:
        return "";
    }
  };

  const getStatusColor = () => {
    switch (processingStatus) {
      case "processing":
        return "text-blue-600";
      case "completed":
        return "text-green-600";
      case "error":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div>
      {open && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50 p-4 dark:bg-black/70">
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6 sm:p-8 w-full max-w-md mx-4 dark:bg-dark-surface/95 dark:border-dark-border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent dark:from-dark-primary dark:to-dark-primary-hover">
                Bookmark Website
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
                  Website URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    placeholder="https://example.com"
                    reference={urlRef}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-dark-text-muted">
                  Enter the full URL of the website you want to bookmark
                </p>
              </div>

              {processingStatus !== "idle" && (
                <div className={`text-sm font-medium ${getStatusColor()}`}>
                  {getStatusMessage()}
                </div>
              )}

              <div className="pt-4">
                <Button
                  variant="primary"
                  className="w-full"
                  loading={loading}
                  onClick={bookmarkWebsite}
                >
                  {loading ? "Bookmarking..." : "Bookmark Website"}
                </Button>
              </div>

              <div className="text-xs text-gray-500 dark:text-dark-text-muted text-center">
                <p>✨ AI will automatically:</p>
                <p>• Extract content and generate summary</p>
                <p>• Identify relevant keywords</p>
                <p>• Enable semantic search</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
