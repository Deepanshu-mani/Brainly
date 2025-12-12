import { useTheme } from "../../contexts/ThemeContext";

export function SearchSkeleton() {
  const { theme } = useTheme();

  return (
    <div className="space-y-4">
      {/* AI Response Skeleton */}
      <div
        className={`border rounded-2xl p-6 backdrop-blur-sm animate-pulse ${
          theme === "light"
            ? "bg-black/5 border-black/10"
            : "bg-white/5 border-white/10"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-8 h-8 rounded-lg ${
              theme === "light" ? "bg-black/20" : "bg-white/20"
            }`}
          />
          <div
            className={`h-4 w-32 rounded ${
              theme === "light" ? "bg-black/20" : "bg-white/20"
            }`}
          />
        </div>
        <div className="space-y-2">
          <div
            className={`h-3 w-full rounded ${
              theme === "light" ? "bg-black/20" : "bg-white/20"
            }`}
          />
          <div
            className={`h-3 w-5/6 rounded ${
              theme === "light" ? "bg-black/20" : "bg-white/20"
            }`}
          />
          <div
            className={`h-3 w-4/6 rounded ${
              theme === "light" ? "bg-black/20" : "bg-white/20"
            }`}
          />
        </div>
      </div>

      {/* Results Skeleton */}
      <div>
        <div
          className={`h-5 w-32 mb-4 rounded ${
            theme === "light" ? "bg-black/20" : "bg-white/20"
          }`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-64 rounded-2xl backdrop-blur-sm animate-pulse ${
                theme === "light"
                  ? "bg-black/5 border border-black/10"
                  : "bg-white/5 border border-white/10"
              }`}
              style={{
                animationDelay: `${i * 100}ms`,
                animationDuration: "1.5s",
              }}
            >
              <div className="p-4 space-y-3">
                <div
                  className={`h-4 w-3/4 rounded ${
                    theme === "light" ? "bg-black/20" : "bg-white/20"
                  }`}
                />
                <div
                  className={`h-3 w-full rounded ${
                    theme === "light" ? "bg-black/20" : "bg-white/20"
                  }`}
                />
                <div
                  className={`h-3 w-5/6 rounded ${
                    theme === "light" ? "bg-black/20" : "bg-white/20"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
