import { useTheme } from "../../contexts/ThemeContext";

export function SearchSkeleton() {
  const { theme } = useTheme();

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Section Header Skeleton */}
      <div className="flex items-center gap-2 px-1">
        <div
          className={`h-4 w-4 rounded animate-pulse ${theme === "light" ? "bg-black/10" : "bg-white/10"
            }`}
        />
        <div
          className={`h-3 w-36 rounded animate-pulse ${theme === "light" ? "bg-black/10" : "bg-white/10"
            }`}
        />
      </div>

      {/* Content Loading Skeleton */}
      <div
        className={`px-6 py-8 rounded-xl border ${theme === "light"
            ? "bg-white/80 border-black/10"
            : "bg-black/40 border-white/10"
          }`}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Animated dots */}
          <div className="flex space-x-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full animate-bounce ${theme === "light" ? "bg-black" : "bg-white"
                  }`}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>

          {/* Loading text */}
          <p
            className={`text-sm font-medium ${theme === "light" ? "text-black/70" : "text-white/70"
              }`}
          >
            Searching your memories...
          </p>

          {/* Shimmer lines */}
          <div className="w-full max-w-md space-y-2 pt-2">
            {[100, 85, 70].map((width, i) => (
              <div
                key={i}
                className={`h-2 rounded-full animate-pulse ${theme === "light" ? "bg-black/5" : "bg-white/5"
                  }`}
                style={{
                  width: `${width}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
