import { Brain } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface AIResponseCardProps {
  response: string;
  onClose: () => void;
}

export function AIResponseCard({ response, onClose }: AIResponseCardProps) {
  const { theme } = useTheme();

  return (
    <div className="mb-8">
      <div className={`border rounded-2xl p-6 backdrop-blur-sm ${
        theme === 'light'
          ? 'bg-black/5 border-black/10'
          : 'bg-white/5 border-white/10'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-black" />
            </div>
            <span className={`font-semibold ${
              theme === 'light' ? 'text-black' : 'text-white'
            }`}>Brainly Response</span>
            <span className={`text-sm ${
              theme === 'light' ? 'text-black/40' : 'text-white/40'
            }`}>{new Date().toLocaleTimeString()}</span>
          </div>
          <button
            onClick={onClose}
            className={`transition-colors ${
              theme === 'light'
                ? 'text-black/40 hover:text-black/60'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className={`leading-relaxed ${
          theme === 'light' ? 'text-black/80' : 'text-white/80'
        }`}>
          {response === "Analyzing your memories..." ? (
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${
                  theme === 'light' ? 'bg-black/60' : 'bg-white/60'
                }`}></div>
                <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${
                  theme === 'light' ? 'bg-black/60' : 'bg-white/60'
                }`} style={{animationDelay: '0.1s'}}></div>
                <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${
                  theme === 'light' ? 'bg-black/60' : 'bg-white/60'
                }`} style={{animationDelay: '0.2s'}}></div>
              </div>
              <span>{response}</span>
            </div>
          ) : (
            <p>{response}</p>
          )}
        </div>
      </div>
    </div>
  );
}
