import React from 'react';
import Masonry from 'react-masonry-css';
import { Card } from '../ui/Card';
import { WebsiteCard } from '../ui/WebsiteCard';
import { NoteCard } from './NoteCard';
import { AddToBrainCard } from './AddToBrainCard';
import { useTheme } from '../contexts/ThemeContext';
import type { Content } from '../types/content';

interface ContentGridProps {
  contents: Content[];
  loading: boolean;
  onUpdateContent: (content: Content) => Promise<void>;
  onDeleteContent: (id: string) => Promise<void>;
  onAddMemory: () => void;
}

export const ContentGrid = React.memo(function ContentGrid({ contents, loading, onUpdateContent, onDeleteContent, onAddMemory }: ContentGridProps) {
  const { theme } = useTheme();

  if (loading) {
    return (
      <div className="py-20">
        {/* Animated Loading Bars */}
        <div className="space-y-4 mb-8">
          <div className={`h-4 rounded-lg animate-pulse ${
            theme === 'light' ? 'bg-black/20' : 'bg-gray-800/50'
          }`}></div>
          <div className={`h-4 rounded-lg animate-pulse w-3/4 ${
            theme === 'light' ? 'bg-black/20' : 'bg-gray-800/50'
          }`}></div>
          <div className={`h-4 rounded-lg animate-pulse w-1/2 ${
            theme === 'light' ? 'bg-black/20' : 'bg-gray-800/50'
          }`}></div>
          <div className={`h-4 rounded-lg animate-pulse w-5/6 ${
            theme === 'light' ? 'bg-black/20' : 'bg-gray-800/50'
          }`}></div>
          <div className={`h-4 rounded-lg animate-pulse w-2/3 ${
            theme === 'light' ? 'bg-black/20' : 'bg-gray-800/50'
          }`}></div>
        </div>
        
        {/* Animated Dots */}
        <div className="flex items-center justify-center space-x-2">
          <div className="flex space-x-1">
            <div className={`w-2 h-2 rounded-full animate-bounce ${
              theme === 'light' ? 'bg-black/60' : 'bg-white/60'
            }`}></div>
            <div className={`w-2 h-2 rounded-full animate-bounce ${
              theme === 'light' ? 'bg-black/60' : 'bg-white/60'
            }`} style={{animationDelay: '0.1s'}}></div>
            <div className={`w-2 h-2 rounded-full animate-bounce ${
              theme === 'light' ? 'bg-black/60' : 'bg-white/60'
            }`} style={{animationDelay: '0.2s'}}></div>
          </div>
          <span className={`text-lg font-medium ml-3 ${
            theme === 'light' ? 'text-black/60' : 'text-white/60'
          }`}>Searching through your memories...</span>
        </div>
      </div>
    );
  }

  // Always render the grid so the AddToBrainCard is visible even with zero memories

  return (
    <div className="pb-8 sm:pb-12 pt-2 sm:pt-4">
      <Masonry
        breakpointCols={{ default: 4, 1400: 3, 1100: 2, 700: 1 }}
        className="flex -ml-4 sm:-ml-8 w-auto"
        columnClassName="pl-4 sm:pl-8 bg-clip-padding"
      >
        {/* Add to Brain Card - Always first */}
        <div className="mb-6 sm:mb-8">
          <AddToBrainCard onAddMemory={onAddMemory} />
        </div>
        
        {contents.map((content) => (
          <div key={content._id} className="mb-6 sm:mb-8">
            {content.type === 'note' ? (
              <NoteCard
                content={content}
                onUpdate={onUpdateContent}
                onDelete={onDeleteContent}
              />
            ) : content.type === 'website' ? (
              <WebsiteCard
                content={content as any}
                onDelete={() => onDeleteContent(content._id)}
                isShared={false}
              />
            ) : (
              <Card
                id={content._id}
                link={content.link}
                type={content.type as 'twitter' | 'youtube'}
                tags={content.tags}
                createdAt={(content as any).createdAt || (content as any).updatedAt}
                onDelete={() => onDeleteContent(content._id)}
                isShared={false}
              />
            )}
          </div>
        ))}
      </Masonry>
      
      {/* End of memories indicator */}
      {contents.length > 0 && (
        <div className="text-center py-8 mt-8">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm border ${
            theme === 'light'
              ? 'bg-black/5 border-black/10 text-black/60'
              : 'bg-white/5 border-white/10 text-white/60'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              theme === 'light' ? 'bg-black/30' : 'bg-white/30'
            }`}></div>
            <span className="text-sm font-medium">
              You've reached the end of your memories
            </span>
            <div className={`w-2 h-2 rounded-full ${
              theme === 'light' ? 'bg-black/30' : 'bg-white/30'
            }`}></div>
          </div>
          <p className={`text-xs mt-2 ${
            theme === 'light' ? 'text-black/40' : 'text-white/40'
          }`}>
            {contents.length} total memories
          </p>
        </div>
      )}
    </div>
  );
});
