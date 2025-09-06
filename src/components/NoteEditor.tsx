import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { PlusIcon } from '../ui/icons/PlusIcon';
import { CrossIcon } from '../ui/icons/CrossIcon';
import { useTheme } from '../contexts/ThemeContext';

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
  const { theme } = useTheme();
  const [content, setContent] = useState('');

  // Initialize content from the link field if it exists and is a data URL
  useEffect(() => {
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
      title: '',
      content: content.trim()
    });
  };

  return (
    <div className={`rounded-2xl shadow-xl border backdrop-blur-xl overflow-hidden ${
      theme === 'light'
        ? 'bg-white/90 border-black/10 shadow-black/10'
        : 'bg-black/90 border-white/10 shadow-white/10'
    }`}>
      <div className={`p-4 border-b flex justify-between items-center ${
        theme === 'light'
          ? 'border-black/10'
          : 'border-white/10'
      }`}>
        <h3 className={`text-lg font-medium ${
          theme === 'light' ? 'text-black' : 'text-white'
        }`}>
          Note
        </h3>
        <button
          onClick={onCancel}
          className={`p-1 rounded-lg transition-colors duration-200 ${
            theme === 'light'
              ? 'text-black/60 hover:text-black hover:bg-black/5'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
          aria-label="Close"
        >
          <CrossIcon />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 space-y-4">

        <div>
          <label htmlFor="content" className={`block text-sm font-medium mb-1 ${
            theme === 'light' ? 'text-black/70' : 'text-white/70'
          }`}>
            Note Content
          </label>
          <textarea
            id="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              theme === 'light'
                ? 'border-black/20 bg-white/80 text-black placeholder-black/50 focus:ring-black/30 focus:border-black/40'
                : 'border-white/20 bg-black/80 text-white placeholder-white/50 focus:ring-white/30 focus:border-white/40'
            }`}
            placeholder="Write your note here..."
            required
          />
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
          >
            <PlusIcon />
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
