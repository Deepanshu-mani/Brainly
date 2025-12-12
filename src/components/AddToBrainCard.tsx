import { Plus } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface AddToBrainCardProps {
  onAddMemory: () => void;
}

export function AddToBrainCard({ onAddMemory }: AddToBrainCardProps) {
  const { theme } = useTheme();

  return (
    <div className="mb-6">
      <button
        onClick={onAddMemory}
        className={`group relative overflow-hidden w-full rounded-2xl border-2 border-dashed transition-all duration-300 hover:scale-[1.02] hover:shadow-xl backdrop-blur-xl ${
          theme === "light"
            ? "bg-white/80 border-black/20 hover:border-black/40 hover:bg-white/90 shadow-lg shadow-black/10"
            : "bg-black/80 border-white/20 hover:border-white/40 hover:bg-black/90 shadow-lg shadow-white/10"
        }`}
      >
        <div className="p-8 text-center">
          {/* Plus Icon */}
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
              theme === "light"
                ? "bg-black/10 group-hover:bg-black/20"
                : "bg-white/10 group-hover:bg-white/20"
            }`}
          >
            <Plus
              className={`w-8 h-8 ${
                theme === "light" ? "text-black/70" : "text-white/70"
              }`}
            />
          </div>

          {/* Text Content */}
          <h3
            className={`text-lg font-bold mb-2 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Add to your second brain.
          </h3>
          <p
            className={`text-sm ${
              theme === "light" ? "text-black/60" : "text-white/60"
            }`}
          >
            Add a link, a note, a document, tweet, etc.
          </p>
        </div>

        {/* Hover Effect Overlay */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            theme === "light"
              ? "bg-gradient-to-br from-black/5 to-transparent"
              : "bg-gradient-to-br from-white/5 to-transparent"
          }`}
        />
      </button>
    </div>
  );
}
