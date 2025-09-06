import { useTheme } from '../contexts/ThemeContext';

type ContentFilter = 'all' | 'website' | 'youtube' | 'twitter' | 'note';

interface StatsFilterTabsProps {
  filter: ContentFilter;
  onFilterChange: (filter: ContentFilter) => void;
  contents: any[];
}

export function StatsFilterTabs({ filter, onFilterChange, contents }: StatsFilterTabsProps) {
  const { theme } = useTheme();

  const tabs = [
    { key: 'all', label: 'All Memories', count: contents?.length || 0 },
    { key: 'website', label: 'Web Pages', count: contents?.filter(c => c.type === 'website').length || 0 },
    { key: 'youtube', label: 'Videos', count: contents?.filter(c => c.type === 'youtube').length || 0 },
    { key: 'twitter', label: 'Tweets', count: contents?.filter(c => c.type === 'twitter').length || 0 },
    { key: 'note', label: 'Notes', count: contents?.filter(c => c.type === 'note').length || 0 },
  ];

  return (
    <div className="mb-12">
      <div className={`flex space-x-2 p-2 rounded-2xl w-fit backdrop-blur-sm border ${
        theme === 'light'
          ? 'bg-black/5 border-black/10'
          : 'bg-white/5 border-white/10'
      }`}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onFilterChange(tab.key as ContentFilter)}
            className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
              filter === tab.key
                ? theme === 'light'
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-white text-black shadow-lg'
                : theme === 'light'
                  ? 'text-black/60 hover:text-black hover:bg-black/10'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
