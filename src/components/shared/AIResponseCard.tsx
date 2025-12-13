import { Sparkles, X } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import ReactMarkdown from "react-markdown";

interface AIResponseCardProps {
  response: string;
  onClose: () => void;
  searchTime?: number;
  resultCount?: number;
}

export function AIResponseCard({
  response,
  onClose,
  searchTime,
  resultCount,
}: AIResponseCardProps) {
  const { theme } = useTheme();

  return (
    <div className="h-full">
      <div
        className={`border rounded-3xl backdrop-blur-xl transition-all duration-300 ${theme === "light"
          ? "bg-white/80 border-black/10 shadow-2xl shadow-black/5"
          : "bg-black/40 border-white/10 shadow-2xl shadow-white/5"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-3 border-b border-opacity-10">
          <div className="flex items-center gap-3">
            {/* Gradient Icon */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme === "light"
                ? "bg-gradient-to-br from-purple-500 to-blue-500"
                : "bg-gradient-to-br from-purple-600 to-blue-600"
                }`}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {/* Title */}
            <div className="flex flex-col">
              <span
                className={`font-bold text-base ${theme === "light" ? "text-black" : "text-white"
                  }`}
              >
                Brainly Response
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`text-xs ${theme === "light" ? "text-black/40" : "text-white/40"
                    }`}
                >
                  {new Date().toLocaleTimeString()}
                </span>
                {searchTime !== undefined && resultCount !== undefined && (
                  <>
                    <span
                      className={`text-xs ${theme === "light" ? "text-black/20" : "text-white/20"
                        }`}
                    >
                      •
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${theme === "light"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-purple-900/30 text-purple-300"
                        }`}
                    >
                      {resultCount} {resultCount === 1 ? "result" : "results"}
                    </span>
                    <span
                      className={`text-xs ${theme === "light" ? "text-black/40" : "text-white/40"
                        }`}
                    >
                      {searchTime}ms
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-all hover:scale-110 active:scale-95 ${theme === "light"
              ? "text-black/40 hover:text-black/60 hover:bg-black/5"
              : "text-white/40 hover:text-white/60 hover:bg-white/5"
              }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div
          className={`px-4 py-4 leading-relaxed text-sm ${theme === "light" ? "text-black/80" : "text-white/80"
            }`}
        >
          {response === "Analyzing your memories..." ? (
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full animate-bounce ${theme === "light"
                      ? "bg-purple-500"
                      : "bg-purple-400"
                      }`}
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <span className={theme === "light" ? "text-black/70" : "text-white/70"}>
                {response}
              </span>
            </div>
          ) : (
            <ReactMarkdown
              components={{
                strong: ({ ...props }) => (
                  <strong
                    className={`font-bold ${theme === "light" ? "text-black" : "text-white"
                      }`}
                    {...props}
                  />
                ),
                p: ({ ...props }) => <p className="mb-3 last:mb-0" {...props} />,
                ul: ({ ...props }) => (
                  <ul className="list-disc list-inside mb-3 space-y-1" {...props} />
                ),
                li: ({ ...props }) => <li className="ml-2" {...props} />,
              }}
            >
              {response}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
