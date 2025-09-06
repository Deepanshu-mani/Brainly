import { useTheme } from '../contexts/ThemeContext';
import { Card } from '../ui/Card';
import { WebsiteCard } from '../ui/WebsiteCard';
import { NoteCard } from './NoteCard';
import type { Content } from '../types/content';

interface MostRelevantContentProps {
  contents: Content[];
  isLoading: boolean;
  onUpdateContent: (content: Content) => Promise<void>;
  onDeleteContent: (id: string) => Promise<void>;
}

export function MostRelevantContent({ contents, isLoading, onUpdateContent, onDeleteContent }: MostRelevantContentProps) {
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <div className="mb-8">
        <h3 className={`text-lg font-semibold mb-4 ${
          theme === 'light' ? 'text-black' : 'text-white'
        }`}>
          Most Relevant
        </h3>
        
        <div className={`border rounded-2xl p-6 backdrop-blur-sm ${
          theme === 'light'
            ? 'bg-black/5 border-black/10'
            : 'bg-white/5 border-white/10'
        }`}>
          {/* Skeleton Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-lg animate-pulse ${
              theme === 'light' ? 'bg-black/20' : 'bg-white/20'
            }`}></div>
            <div className="flex-1">
              <div className={`h-4 rounded animate-pulse mb-2 ${
                theme === 'light' ? 'bg-black/20' : 'bg-white/20'
              }`} style={{width: '60%'}}></div>
              <div className={`h-3 rounded animate-pulse ${
                theme === 'light' ? 'bg-black/20' : 'bg-white/20'
              }`} style={{width: '40%'}}></div>
            </div>
          </div>

          {/* Skeleton Content */}
          <div className="space-y-3">
            <div className={`h-3 rounded animate-pulse ${
              theme === 'light' ? 'bg-black/20' : 'bg-white/20'
            }`} style={{width: '100%'}}></div>
            <div className={`h-3 rounded animate-pulse ${
              theme === 'light' ? 'bg-black/20' : 'bg-white/20'
            }`} style={{width: '85%'}}></div>
            <div className={`h-3 rounded animate-pulse ${
              theme === 'light' ? 'bg-black/20' : 'bg-white/20'
            }`} style={{width: '70%'}}></div>
            <div className={`h-3 rounded animate-pulse ${
              theme === 'light' ? 'bg-black/20' : 'bg-white/20'
            }`} style={{width: '90%'}}></div>
          </div>
          
          {/* Skeleton Footer */}
          <div className="mt-4 flex justify-end">
            <div className={`h-3 rounded animate-pulse ${
              theme === 'light' ? 'bg-black/20' : 'bg-white/20'
            }`} style={{width: '30%'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (contents.length === 0) {
    return (
      <div className="mb-8">
        <h3 className={`text-lg font-semibold mb-4 ${
          theme === 'light' ? 'text-black' : 'text-white'
        }`}>
          Most Relevant
        </h3>
        
        <div className={`border rounded-2xl p-6 backdrop-blur-sm text-center ${
          theme === 'light'
            ? 'bg-black/5 border-black/10'
            : 'bg-white/5 border-white/10'
        }`}>
          <p className={`${
            theme === 'light' ? 'text-black/60' : 'text-white/60'
          }`}>
            No relevant content found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className={`text-lg font-semibold mb-4 ${
        theme === 'light' ? 'text-black' : 'text-white'
      }`}>
        Most Relevant
      </h3>
      
      <div className="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contents.map((content) => (
            <div key={content._id} className="transform scale-60 origin-top-left">
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
        </div>
      </div>
    </div>
  );
}
