import { LogOut } from "lucide-react";
import { BrainIcon, ShareIcon } from "../ui/icons";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { showToast } from "../utils/toast";

interface DashboardHeaderProps {
  user: { username: string; email: string } | null;
  onLogout: () => void;
  onAddMemory: () => void;
}

export function DashboardHeader({
  user,
  onLogout,
  onAddMemory,
}: DashboardHeaderProps) {
  const { theme } = useTheme();
  const [, setShareHash] = useState<string | null>(null);
  const [shareLoading, setShareLoading] = useState(false);

  const handleShare = async () => {
    setShareLoading(true);
    const loadingToast = showToast.loading("Creating share link...");

    try {
      const response = await axios.post(
        `${BACKEND_URL}/brain/share`,
        {
          share: true,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        },
      );

      const hash = response.data.hash;
      setShareHash(hash);
      const shareUrl = `${window.location.origin}/share/${hash}`;

      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl);

      showToast.dismiss(loadingToast);
      showToast.success("Share link copied to clipboard!");
    } catch (error) {
      console.error("Error creating share link:", error);
      showToast.dismiss(loadingToast);
      showToast.error("Failed to create share link. Please try again.");
    } finally {
      setShareLoading(false);
    }
  };

  // handleReprocess removed as it was unused

  return (
    <header
      className={`border-b backdrop-blur-2xl sticky top-0 z-50 ${
        theme === "light"
          ? "border-black/10 bg-white/80 shadow-lg shadow-black/5"
          : "border-white/10 bg-black/80 shadow-lg shadow-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <BrainIcon />
            <span
              className={`text-lg sm:text-xl font-bold ${theme === "light" ? "text-black" : "text-white"}`}
            >
              Brainly
            </span>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onAddMemory}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 font-semibold rounded-xl transition-all duration-300 backdrop-blur-xl border text-xs sm:text-sm shadow-lg hover:shadow-xl ${
                theme === "light"
                  ? "bg-white/30 hover:bg-white/40 text-black border-black/20 shadow-black/10 hover:shadow-black/20"
                  : "bg-black/30 hover:bg-black/40 text-white border-white/20 shadow-white/10 hover:shadow-white/20"
              }`}
            >
              <span className="hidden sm:inline">+ Add Memory</span>
              <span className="sm:hidden">+ Add</span>
            </button>

            {/* Reprocess Button */}
            {/* <button
              onClick={handleReprocess}
              className={`p-2 sm:p-2.5 rounded-xl transition-all duration-300 backdrop-blur-xl border shadow-lg hover:shadow-xl ${
                theme === 'light'
                  ? 'bg-white/30 hover:bg-white/40 text-black border-black/20 shadow-black/10 hover:shadow-black/20'
                  : 'bg-black/30 hover:bg-black/40 text-white border-white/20 shadow-white/10 hover:shadow-white/20'
              }`}
              title="Reprocess content for AI summaries"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button> */}

            {/* Share Button */}
            <button
              onClick={handleShare}
              disabled={shareLoading}
              className={`p-2 sm:p-2.5 rounded-xl transition-all duration-300 backdrop-blur-xl border shadow-lg hover:shadow-xl ${
                theme === "light"
                  ? "bg-white/30 hover:bg-white/40 text-black border-black/20 shadow-black/10 hover:shadow-black/20"
                  : "bg-black/30 hover:bg-black/40 text-white border-white/20 shadow-white/10 hover:shadow-white/20"
              } ${shareLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              title="Share your brain"
            >
              <ShareIcon />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Initial with Dropdown */}
            <div className="relative group">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center backdrop-blur-xl border cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl ${
                  theme === "light"
                    ? "bg-black/90 border-black/30 hover:border-black/50 shadow-black/20 hover:shadow-black/30"
                    : "bg-white/90 border-white/30 hover:border-white/50 shadow-white/20 hover:shadow-white/30"
                }`}
              >
                <span
                  className={`font-semibold text-xs sm:text-sm ${
                    theme === "light" ? "text-white" : "text-black"
                  }`}
                >
                  {(user?.username || "U").charAt(0).toUpperCase()}
                </span>
              </div>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 top-full mt-3 w-52 backdrop-blur-2xl border rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 ${
                  theme === "light"
                    ? "bg-white/90 border-black/20 shadow-black/20"
                    : "bg-black/90 border-white/20 shadow-white/20"
                }`}
              >
                <div
                  className={`p-3 border-b ${
                    theme === "light" ? "border-black/10" : "border-white/10"
                  }`}
                >
                  <p
                    className={`font-semibold text-sm ${
                      theme === "light" ? "text-black" : "text-white"
                    }`}
                  >
                    {user?.username}
                  </p>
                  <p
                    className={`text-xs ${
                      theme === "light" ? "text-black/60" : "text-white/60"
                    }`}
                  >
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={onLogout}
                  className={`w-full px-3 py-2 text-left transition-all duration-200 flex items-center gap-2 text-sm ${
                    theme === "light"
                      ? "text-black/80 hover:text-black hover:bg-black/10"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
