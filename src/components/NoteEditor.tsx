import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { PlusIcon } from '../ui/icons/PlusIcon';
import { CrossIcon } from '../ui/icons/CrossIcon';

type NoteEditorProps = {
  initialContent?: string;
  initialTitle?: string;
  onSave: (data: { title: string; content: string }) => void;
  onCancel: () => void;
};

export function NoteEditor({
  initialContent = '',
  initialTitle = '',
  onSave,
  onCancel,
}: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState('');

  // Initialize content from the link field if it exists and is a data URL
  useEffect(() => {
    setTitle(initialTitle ?? '');

    // Check if initialContent is a data URL
    if (initialContent?.startsWith('data:text/plain;charset=utf-8,')) {
      try {
        const decoded = decodeURIComponent(initialContent.split(',')[1] || '');
        setContent(decoded);
      } catch {
        setContent('');
      }
    } else {
      setContent(initialContent ?? '');
    }
  }, [initialTitle, initialContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: title.trim(),
      content: content.trim()
    });
  };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-lg shadow-lg border border-gray-200 dark:border-dark-border overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text">
          Note
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500 dark:text-dark-text-muted dark:hover:text-white"
          aria-label="Close"
        >
          <CrossIcon />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-dark-text-muted mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-dark-surface dark:text-white"
            placeholder="Enter a title"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-dark-text-muted mb-1">
            Note Content
          </label>
          <textarea
            id="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-dark-surface dark:text-white"
            required
          />
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <Button
            variant="secondary"
            onClick={onCancel}
            text="Cancel"
          />
          <Button
            variant="primary"
            startIcon={<PlusIcon />}
            text="Save"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
