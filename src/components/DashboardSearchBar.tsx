import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../contexts/ThemeContext";

interface DashboardSearchBarProps {
  onAiSearch: (query: string) => void;
  isSearching?: boolean;
}

export function DashboardSearchBar({
  onAiSearch,
  isSearching = false,
}: DashboardSearchBarProps) {
  const { theme } = useTheme();
  const [searchType, setSearchType] = useState<string>("all");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showTypeDropdown) {
        const target = event.target as Element;
        if (
          !target.closest(".dropdown-container") &&
          !target.closest("[data-dropdown-menu]")
        ) {
          setShowTypeDropdown(false);
        }
      }
    };

    if (showTypeDropdown) {
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTypeDropdown]);

  const handleSearch = () => {
    const input = document.querySelector(
      'input[placeholder="what i post all over days"]',
    ) as HTMLInputElement;
    if (input?.value.trim()) {
      onAiSearch(input.value.trim());
    }
  };

  return (
    <div className="mb-12">
      <div className="relative max-w-7xl">
        <div
          className={`flex rounded-2xl overflow-hidden backdrop-blur-xl ${
            theme === "light"
              ? "border border-black/10 bg-white/10"
              : "border border-white/10 bg-black/10"
          }`}
        >
          {/* Type Dropdown */}
          <div className="relative dropdown-container">
            <button
              type="button"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setDropdownPosition({
                  top: rect.bottom + window.scrollY + 8,
                  left: rect.left + window.scrollX,
                  width: rect.width,
                });
                setShowTypeDropdown(!showTypeDropdown);
              }}
              className={`px-4 py-4 transition-all duration-200 flex items-center gap-2 backdrop-blur-sm ${
                theme === "light"
                  ? "bg-white/20 text-black hover:bg-white/30"
                  : "bg-black/20 text-white hover:bg-black/30"
              }`}
            >
              <span className="text-lg font-medium">
                {searchType === "all"
                  ? "All"
                  : searchType === "website"
                    ? "Web"
                    : searchType === "youtube"
                      ? "Video"
                      : searchType === "twitter"
                        ? "Tweet"
                        : searchType === "note"
                          ? "Note"
                          : "All"}
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${showTypeDropdown ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu - Using Portal */}
            {showTypeDropdown &&
              createPortal(
                <div
                  data-dropdown-menu
                  className={`fixed w-48 rounded-xl shadow-2xl border backdrop-blur-xl ${
                    theme === "light"
                      ? "bg-white/95 border-black/20 shadow-black/10"
                      : "bg-black/95 border-white/20 shadow-white/10"
                  }`}
                  style={{
                    position: "fixed",
                    top: dropdownPosition.top,
                    left: dropdownPosition.left,
                    width: "192px",
                    zIndex: 9999,
                    display: "block",
                    visibility: "visible",
                    opacity: "1",
                  }}
                >
                  {[
                    { key: "all", label: "All Types" },
                    { key: "website", label: "Web Pages" },
                    { key: "youtube", label: "Videos" },
                    { key: "twitter", label: "Tweets" },
                    { key: "note", label: "Notes" },
                  ].map((type) => (
                    <button
                      key={type.key}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSearchType(type.key);
                        setShowTypeDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${
                        searchType === type.key
                          ? theme === "light"
                            ? "bg-black text-white"
                            : "bg-white text-black"
                          : theme === "light"
                            ? "text-black hover:bg-black/5"
                            : "text-white hover:bg-white/5"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>,
                document.body,
              )}
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder={
              isSearching
                ? "Searching your memories..."
                : "Search your memories with AI..."
            }
            disabled={isSearching}
            className={`flex-1 px-6 py-4 text-lg font-medium focus:outline-none transition-all duration-200 backdrop-blur-sm ${
              theme === "light"
                ? "bg-white/20 text-black placeholder-black/40 disabled:bg-gray-100/50 disabled:text-gray-400"
                : "bg-black/20 text-white placeholder-white/40 disabled:bg-gray-800/50 disabled:text-gray-500"
            }`}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !isSearching) {
                const query = (e.target as HTMLInputElement).value.trim();
                if (query) {
                  onAiSearch(query);
                }
              }
            }}
          />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className={`px-4 py-4 transition-all duration-200 backdrop-blur-sm ${
              theme === "light"
                ? "bg-white/20 hover:bg-white/30 disabled:hover:bg-white/20"
                : "bg-black/20 hover:bg-black/30 disabled:hover:bg-black/20"
            }`}
          >
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg
                className={`w-5 h-5 ${
                  theme === "light" ? "text-black/60" : "text-white/60"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
