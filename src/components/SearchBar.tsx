import { useState, useEffect, useRef, useCallback, memo } from "react";
import { SearchIcon, FilterIcon } from "../ui/icons";
import { BACKEND_URL } from "../config";
import axios from "axios";
import type { ContentType, SearchFilters } from "../types/content";

interface SearchBarProps {
  onSearchResults: (results: any[]) => void;
  onSearchStart: () => void;
  onSearchEnd: () => void;
}

export const SearchBar = memo(SearchBarComponent);

function SearchBarComponent({ onSearchResults, onSearchStart, onSearchEnd }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    type: undefined,
    tags: []
  });
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceTimerRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Fetch available tags from user's content
  useEffect(() => {
    fetchAvailableTags();
  }, []);

  const fetchAvailableTags = useCallback(async () => {
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
  }, []);

  const fetchAllContent = useCallback(async () => {
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
  }, [onSearchResults]);

  const handleSearch = useCallback(async () => {
    const activeTags = filters.tags ?? [];

    if (!query.trim() && !filters.type && activeTags.length === 0) {
      // If no search criteria, fetch all content
      await fetchAllContent();
      return;
    }

    // cancel any in-flight request
    try {
      abortControllerRef.current?.abort();
    } catch {}
    const controller = new AbortController();
    abortControllerRef.current = controller;

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
      
      // no limit parameter; backend will use default or unlimited when configured

      const response = await axios.get(`${BACKEND_URL}/content/search?${searchParams}`, {
        headers: {
          Authorization: localStorage.getItem("token") || ""
        },
        signal: controller.signal
      });

      onSearchResults(response.data.content);
    } catch (error: any) {
      const isCanceled = error?.name === 'CanceledError' || error?.message === 'canceled' || error?.code === 'ERR_CANCELED';
      if (isCanceled) {
        // don't clear results on cancellations
      } else {
        console.error("Search failed:", error);
        onSearchResults([]);
      }
    } finally {
      setLoading(false);
      onSearchEnd();
    }
  }, [
    query,
    filters.type,
    filters.tags,
    onSearchStart,
    onSearchEnd,
    onSearchResults,
    fetchAllContent
  ]);

  const handleTagToggle = useCallback((tag: string) => {
    setFilters(prev => {
      const prevTags = prev.tags ?? [];
      const nextTags = prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag];
      return { ...prev, tags: nextTags };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      type: undefined,
      tags: []
    });
    setQuery("");
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      handleSearch();
    }
  }, [handleSearch]);

  // Live, debounced search on input/filter change
  useEffect(() => {
    // debounce to avoid spamming backend while typing
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = window.setTimeout(() => {
      handleSearch();
    }, 350);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters.type, JSON.stringify(filters.tags), filters.limit, handleSearch]);

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative transition-all">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search your content..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ease-out shadow-sm focus:shadow-md dark:bg-dark-surface dark:border-dark-border dark:text-dark-text text-sm sm:text-base placeholder:text-xs sm:placeholder:text-sm"
          aria-label="Search content"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-purple-600" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          ) : (
                      <button
            onClick={handleSearch}
            className="text-purple-600 hover:text-purple-700 font-medium transition-colors text-sm sm:text-base"
            aria-label="Run search"
          >
            Search
          </button>
          )}
        </div>
      </div>

      {/* Filters Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 dark:text-dark-text-muted dark:hover:text-dark-text"
        >
          <FilterIcon className="h-3 w-3 sm:h-4 sm:w-4" />
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
      <div className={`transform transition-all origin-top ${showFilters ? 'opacity-100 scale-100 max-h-[1000px]' : 'opacity-0 scale-95 max-h-0'} overflow-hidden bg-white/5 dark:bg-dark-surface-secondary rounded-lg ${showFilters ? 'p-4' : 'p-0'} space-y-4`}>
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
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-150 ${
                    filters.type === type
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-dark-border dark:text-dark-text dark:hover:bg-dark-border-hover'
                  }`}
                  aria-pressed={filters.type === type}
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
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-150 ${
                      (filters.tags ?? []).includes(tag)
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-dark-border dark:text-dark-text dark:hover:bg-dark-border-hover'
                    }`}
                    aria-pressed={(filters.tags ?? []).includes(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Limit removed */}
      </div>
     
    </div>
  );
}
