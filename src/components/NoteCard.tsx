import { useState } from 'react';
import { format } from 'date-fns';
import { NoteEditor } from './NoteEditor';
import type { Content } from '../types/content';
import { PencilIcon } from '../ui/icons/PencilIcon';
import { TrashIcon } from '../ui/icons/TrashIcon';
import { BellIcon } from '../ui/icons/BellIcon';
import { CheckIcon } from '../ui/icons/CheckIcon';
type NoteCardProps = {
  content: Content;
  onUpdate: (updatedContent: Content) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export function NoteCard({ content, onUpdate, onDelete }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isReminder = content.type === 'reminder';
  const dueDate = isReminder ? (content as any).dueDate : null;
  const isCompleted = isReminder ? (content as any).isCompleted : false;

  const handleSave = async (data: { title: string; content: string; dueDate?: string }) => {
    await onUpdate({
      ...content,
      title: data.title,
      ...(isReminder 
        ? { 
            type: 'reminder',
            content: data.content,
            dueDate: data.dueDate || ''
          }
        : { 
            type: 'note',
            content: data.content
          })
    } as Content);
    setIsEditing(false);
  };

  const handleToggleComplete = async () => {
    if (!isReminder) return;
    
    await onUpdate({
      ...content,
      isCompleted: !isCompleted
    } as Content);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setIsDeleting(true);
      try {
        await onDelete(content._id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (isEditing) {
    return (
      <div className="mb-4">
        <NoteEditor
          initialTitle={content.title}
          initialContent={isReminder ? (content as any).content : ''}
          isReminder={isReminder}
          initialDueDate={dueDate}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-dark-surface rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-dark-border transition-all duration-200 hover:shadow-lg ${
      isCompleted ? 'opacity-70' : ''
    }`}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            {isReminder && (
              <button
                onClick={handleToggleComplete}
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-green-500 text-white' 
                    : 'border-2 border-gray-300 dark:border-gray-600 hover:border-green-500'
                }`}
                aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {isCompleted && <CheckIcon className="w-3 h-3" />}
              </button>
            )}
            <h3 className={`text-lg font-medium ${
              isCompleted ? 'line-through text-gray-500' : 'text-gray-900 dark:text-dark-text'
            }`}>
              {content.title}
            </h3>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-blue-600 dark:text-dark-text-muted dark:hover:text-blue-400 transition-colors"
              aria-label="Edit"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-gray-500 hover:text-red-600 dark:text-dark-text-muted dark:hover:text-red-400 transition-colors disabled:opacity-50"
              aria-label="Delete"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isReminder && dueDate && (
          <div className="flex items-center text-sm text-gray-600 dark:text-dark-text-muted mb-3">
            <BellIcon className="w-4 h-4 mr-1.5" />
            <span>Due: {format(new Date(dueDate), 'MMM d, yyyy h:mm a')}</span>
          </div>
        )}

        <div className="text-gray-700 dark:text-dark-text-muted whitespace-pre-line">
          {isReminder ? (content as any).content : (content as any).content}
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
  );
}
