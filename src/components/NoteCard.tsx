import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { NoteEditor } from './NoteEditor';
import type { Content } from '../types/content';
import { EditIcon } from '../ui/icons/EditIcon';
import { DeleteIcon } from '../ui/icons/DeleteIcon';
import { StickyNote, Maximize2, X } from 'lucide-react';
type NoteCardProps = {
  content: Content;
  onUpdate?: (updatedContent: Content) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  isShared?: boolean;
};

export function NoteCard({ content, onUpdate, onDelete, isShared }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Lock body scroll when expanded
  useEffect(() => {
    if (!isExpanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isExpanded]);

  const handleSave = async (data: { title: string; content: string }) => {
    try {
      const trimmedTitle = data.title.trim();
      const trimmedContent = data.content.trim();
      const updatedAt = new Date().toISOString();

      let updatedContent: Content;

      if (content.type === 'note') {
        updatedContent = {
          ...content,
          title: trimmedTitle,
          content: trimmedContent,
          link: `data:text/plain;charset=utf-8,${encodeURIComponent(trimmedContent)}`,
          updatedAt,
          type: 'note',
        };
      } else if (content.type === 'twitter' || content.type === 'youtube') {
        const link = content.link?.startsWith('data:text/plain;charset=utf-8,')
          ? `data:text/plain;charset=utf-8,${encodeURIComponent(trimmedContent)}`
          : content.link ?? '';

        updatedContent = {
          ...content,
          title: trimmedTitle,
          link,
          content: trimmedContent,
          updatedAt,
          type: content.type,
        };
      } else {
        throw new Error(`Unsupported content type: ${content.type}`);
      }

      if (!onUpdate) return;
      await onUpdate(updatedContent);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      if (!onDelete) return;
      await onDelete(content._id);
    } catch (error) {
      console.error('Error deleting note:', error);
      setIsDeleting(false);
    }
  };

  const getNoteContent = () => {
    try {
      if (content.link?.startsWith('data:text/plain;charset=utf-8,')) {
        return decodeURIComponent(content.link.split(',')[1] || '').trim();
      }
    } catch (e) {
      console.warn('Failed to decode content.link:', e);
    }
    return (content.content ?? '').trim();
  };

  const createdAt = (content as any)?.createdAt || (content as any)?.updatedAt;
  const formattedDate = createdAt ? (() => {
    const d = new Date(createdAt);
    return isNaN(d.getTime()) ? '' : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  })() : '';

  return (
    <>
      <div className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 dark:bg-dark-surface/90 dark:border-dark-border dark:shadow-2xl w-[360px] h-[260px] flex flex-col pb-7">
        <div className="flex px-4 sm:px-6 py-3 sm:py-4 justify-between items-center bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 dark:from-dark-surface dark:to-dark-surface-alt dark:border-dark-border">
          <div className="text-gray-700 flex items-center gap-2 sm:gap-3 font-medium min-w-0 flex-1 dark:text-dark-text">
            <div className="p-1.5 sm:p-2 rounded-lg flex-shrink-0 bg-purple-100 dark:bg-white/10">
              <StickyNote className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="truncate text-sm sm:text-base">{content.title}</span>
          </div>
          
          <div className="flex text-gray-500 gap-2 sm:gap-3 flex-shrink-0 dark:text-dark-text-muted">
            <button 
              onClick={() => setIsExpanded(true)}
              className="hover:text-purple-600 transition-colors p-1 dark:hover:text-dark-primary"
              aria-label="Expand note"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          {!isShared && (onUpdate || onDelete) && (
            <div className="flex text-gray-500 gap-2 sm:gap-3 flex-shrink-0 dark:text-dark-text-muted">
              {onUpdate && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="hover:text-blue-500 transition-colors p-1 dark:hover:text-dark-primary"
                  aria-label="Edit note"
                >
                  <EditIcon />
                </button>
              )}
              {onDelete && (
                <button 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="hover:text-red-500 transition-colors p-1 dark:hover:text-dark-error"
                  aria-label="Delete note"
                >
                  <DeleteIcon />
                </button>
              )}
            </div>
          )}
          </div>
          {formattedDate && (
            <div className="absolute bottom-3 right-3 text-[11px] text-gray-500 dark:text-dark-text-muted select-none">
              {formattedDate}
            </div>
          )}
        </div>
        
        <div 
          className={`p-4 sm:p-6 flex-1 overflow-y-auto ${onUpdate && !isShared ? 'cursor-pointer' : ''}`}
          onClick={() => {
            if (onUpdate && !isShared) setIsEditing(true)
          }}
        >
          <div className="text-gray-700 dark:text-dark-text-muted whitespace-pre-line break-words">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {getNoteContent()}
            </p>
          </div>
          
          {content.tags && content.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {content.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full dark:bg-purple-900/30 dark:text-purple-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Expanded View via Portal */}
      {isExpanded && createPortal(
        (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsExpanded(false);
            }}
          >
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark-surface rounded-lg p-6 pb-10">
              <button
                className="absolute right-2 top-2 text-white/90 hover:text-white bg-black/40 rounded-full p-1"
                onClick={() => setIsExpanded(false)}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-dark-text">{content.title}</h2>
              <div className="text-gray-800 dark:text-dark-text whitespace-pre-wrap leading-relaxed">
                {getNoteContent() || ""}
              </div>
              {content.tags && content.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {content.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-purple-600/10 text-purple-700 px-3 py-1 text-xs font-medium rounded-full dark:bg-purple-500/20 dark:text-purple-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              {formattedDate && (
                <div className="absolute bottom-3 right-4 text-xs text-gray-600 dark:text-dark-text-muted md:text-[11px]">
                  {formattedDate}
                </div>
              )}
            </div>
          </div>
        ),
        document.body
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            // Close modal when clicking on the overlay
            if (e.target === e.currentTarget) {
              setIsEditing(false);
            }
          }}
        >
          <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <NoteEditor
              key={`editor-${content._id}`}
              initialTitle={content.title}
              initialContent={getNoteContent()}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
