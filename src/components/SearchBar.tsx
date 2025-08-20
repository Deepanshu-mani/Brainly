import { useState, useEffect } from "react";
import { SearchIcon, FilterIcon } from "../ui/icons";
import { BACKEND_URL } from "../config";
import axios from "axios";
import type { ContentType, SearchFilters } from "../types/content";

interface SearchBarProps {
  onSearchResults: (results: any[]) => void;
  onSearchStart: () => void;
  onSearchEnd: () => void;
}

export function SearchBar({ onSearchResults, onSearchStart, onSearchEnd }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    type: undefined,
    tags: [],
    limit: 20
  });
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch available tags from user's content
  useEffect(() => {
    fetchAvailableTags();
  }, []);

  const fetchAvailableTags = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/content`, {
        headers: {
          Authorization: localStorage.getItem("token") || ""
        }
      });
      
      const allTags = (response.data.content as any[]).flatMap((item) => (item.tags || []) as string[]);
      const uniqueTags = [...new Set(allTags)];
      setAvailableTags(uniqueTags);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  const handleSearch = async () => {
    const activeTags = filters.tags ?? [];

    if (!query.trim() && !filters.type && activeTags.length === 0) {
      // If no search criteria, fetch all content
      await fetchAllContent();
      return;
    }

    setLoading(true);
    onSearchStart();

    try {
      const searchParams = new URLSearchParams();
      
      if (query.trim()) {
        searchParams.append('query', query.trim());
      }
      
      if (filters.type) {
        searchParams.append('type', filters.type);
      }
      
      if (activeTags.length > 0) {
        searchParams.append('tags', activeTags.join(','));
      }
      
      if (filters.limit) {
        searchParams.append('limit', String(filters.limit));
      }

      const response = await axios.get(`${BACKEND_URL}/content/search?${searchParams}`, {
        headers: {
          Authorization: localStorage.getItem("token") || ""
        }
      });

      onSearchResults(response.data.content);
    } catch (error) {
      console.error("Search failed:", error);
      onSearchResults([]);
    } finally {
      setLoading(false);
      onSearchEnd();
    }
  };

  const fetchAllContent = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/content`, {
        headers: {
          Authorization: localStorage.getItem("token") || ""
        }
      });
      onSearchResults(response.data.content);
    } catch (error) {
      console.error("Failed to fetch content:", error);
      onSearchResults([]);
    }
  };

  const handleTagToggle = (tag: string) => {
    setFilters(prev => {
      const prevTags = prev.tags ?? [];
      const nextTags = prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag];
      return { ...prev, tags: nextTags };
    });
  };

  const clearFilters = () => {
    setFilters({
      type: undefined,
      tags: [],
      limit: 20
    });
    setQuery("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search your content with AI-powered semantic search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-dark-surface dark:border-dark-border dark:text-dark-text"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="absolute inset-y-0 right-0 px-4 text-purple-600 hover:text-purple-700 font-medium disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Filters Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 dark:text-dark-text-muted dark:hover:text-dark-text"
        >
          <FilterIcon className="h-4 w-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        
        {(query || filters.type || (filters.tags && filters.tags.length > 0)) && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white/5 dark:bg-dark-surface-secondary rounded-lg p-4 space-y-4">
          {/* Content Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
              Content Type
            </label>
            <div className="flex flex-wrap gap-2">
              {(['youtube', 'twitter', 'note', 'website'] as ContentType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilters(prev => ({ ...prev, type: prev.type === type ? undefined : type }))}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.type === type
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-dark-border dark:text-dark-text dark:hover:bg-dark-border-hover'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          {availableTags.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      (filters.tags ?? []).includes(tag)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-dark-border dark:text-dark-text dark:hover:bg-dark-border-hover'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
              Results Limit
            </label>
            <select
              value={filters.limit}
              onChange={(e) => setFilters(prev => ({ ...prev, limit: parseInt(e.target.value) }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-dark-surface dark:border-dark-border dark:text-dark-text"
            >
              <option value={10}>10 results</option>
              <option value={20}>20 results</option>
              <option value={50}>50 results</option>
              <option value={100}>100 results</option>
            </select>
          </div>
        </div>
      )}

      {/* Search Info */}
      <div className="text-xs text-gray-500 dark:text-dark-text-muted text-center">
        <p>🔍 AI-powered semantic search finds related content even with different words</p>
        <p>✨ Use filters to narrow down results by type, tags, or content</p>
      </div>
    </div>
  );
}

