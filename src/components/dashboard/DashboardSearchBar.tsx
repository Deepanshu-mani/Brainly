import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Sparkles, Search } from "lucide-react";

interface DashboardSearchBarProps {
  onAiSearch: (query: string) => void;
  isSearching?: boolean;
}

export function DashboardSearchBar({
  onAiSearch,
  isSearching = false,
}: DashboardSearchBarProps) {
  const { theme } = useTheme();
  const [userInput, setUserInput] = useState("");

  const exampleQueries = [
    "Find that video about React hooks",
    "What was that tweet about productivity?",
    "Show me articles about machine learning",
  ];

  const handleSearch = (query?: string) => {
    const searchTerm = query || userInput;
    if (!searchTerm.trim()) return;

    onAiSearch(searchTerm);
    if (query) setUserInput(query);
  };

  return (
    <div className="mb-6">
      <div className="max-w-5xl mx-auto">
        {/* Compact Search Card */}
        <div
          className={`p-4 rounded-2xl border transition-all duration-300 ${theme === "light"
              ? "bg-white/80 backdrop-blur-xl border-black/10 shadow-lg shadow-black/5"
              : "bg-black/40 backdrop-blur-xl border-white/10 shadow-lg shadow-white/5"
            }`}
        >
          {/* Interactive search input */}
          <div
            className={`flex items-center gap-3 p-3 rounded-xl border group focus-within:border-opacity-50 transition-all ${theme === "light"
                ? "bg-black/5 border-black/10 focus-within:border-black/30"
                : "bg-white/5 border-white/10 focus-within:border-white/30"
              }`}
          >
            <div
              className={`${isSearching ? "animate-spin" : ""
                } transition-transform`}
            >
              <Sparkles
                className={`w-4 h-4 shrink-0 transition-colors ${isSearching
                    ? theme === "light"
                      ? "text-black"
                      : "text-white"
                    : theme === "light"
                      ? "text-black/40"
                      : "text-white/40"
                  }`}
              />
            </div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Ask anything about your saved content..."
              disabled={isSearching}
              className={`flex-1 min-h-[20px] text-sm bg-transparent border-none outline-none ${theme === "light"
                  ? "text-black placeholder:text-black/40"
                  : "text-white placeholder:text-white/40"
                }`}
            />
            <button
              onClick={() => handleSearch()}
              disabled={isSearching}
              className={`p-1.5 rounded-lg transition-all hover:scale-110 active:scale-95 ${theme === "light"
                  ? "bg-black/5 hover:bg-black/10"
                  : "bg-white/5 hover:bg-white/10"
                }`}
            >
              <Search
                className={`w-4 h-4 ${theme === "light" ? "text-black/60" : "text-white/60"
                  }`}
              />
            </button>
          </div>

          {/* Compact example queries inline */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {exampleQueries.map((query, i) => (
              <button
                key={i}
                onClick={() => handleSearch(query)}
                disabled={isSearching}
                className={`px-2.5 py-1 text-[11px] rounded-full border transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${theme === "light"
                    ? "text-black/50 bg-black/5 border-black/10 hover:border-black/20 hover:text-black/70"
                    : "text-white/50 bg-white/5 border-white/10 hover:border-white/20 hover:text-white/70"
                  }`}
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
