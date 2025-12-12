import { useTheme } from "../../contexts/ThemeContext";

import type { Content } from "../../types/content";

type ContentFilter = "all" | "website" | "youtube" | "twitter" | "note";

interface StatsFilterTabsProps {
  filter: ContentFilter;
  onFilterChange: (filter: ContentFilter) => void;
  contents: Content[];
}

export function StatsFilterTabs({
  filter,
  onFilterChange,
  contents,
}: StatsFilterTabsProps) {
  const { theme } = useTheme();

  const tabs = [
    { key: "all", label: "All Memories", count: contents?.length || 0 },
    {
      key: "website",
      label: "Web Pages",
      count: contents?.filter((c) => c.type === "website").length || 0,
    },
    {
      key: "youtube",
      label: "Videos",
      count: contents?.filter((c) => c.type === "youtube").length || 0,
    },
    {
      key: "twitter",
      label: "Tweets",
      count: contents?.filter((c) => c.type === "twitter").length || 0,
    },
    {
      key: "note",
      label: "Notes",
      count: contents?.filter((c) => c.type === "note").length || 0,
    },
  ];

  return (
    <div className="mb-8 sm:mb-12">
      <div
        className={`flex space-x-1 sm:space-x-2 p-1 sm:p-2 rounded-2xl w-full sm:w-fit backdrop-blur-sm border overflow-x-auto ${
          theme === "light"
            ? "bg-black/5 border-black/10"
            : "bg-white/5 border-white/10"
        }`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onFilterChange(tab.key as ContentFilter)}
            className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
              filter === tab.key
                ? theme === "light"
                  ? "bg-black text-white shadow-lg"
                  : "bg-white text-black shadow-lg"
                : theme === "light"
                  ? "text-black/60 hover:text-black hover:bg-black/10"
                  : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">
              {tab.key === "all"
                ? "All"
                : tab.key === "website"
                  ? "Web"
                  : tab.key === "youtube"
                    ? "Videos"
                    : tab.key === "twitter"
                      ? "Tweets"
                      : tab.key === "note"
                        ? "Notes"
                        : tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
