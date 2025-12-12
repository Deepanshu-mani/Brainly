import { useTheme } from "../../contexts/ThemeContext";
import { Card } from "../../ui/Card";
import { WebsiteCard } from "../../ui/WebsiteCard";
import { NoteCard } from "./NoteCard";
import type { Content } from "../../types/content";

interface MostRelevantContentProps {
  contents: Content[];
  isLoading: boolean;
  onUpdateContent: (content: Content) => Promise<void>;
  onDeleteContent: (id: string) => Promise<void>;
}

export function MostRelevantContent({
  contents,
  isLoading,
  onUpdateContent,
  onDeleteContent,
}: MostRelevantContentProps) {
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <div className="h-full flex flex-col overflow-y-auto">
        <div
          className={`border rounded-2xl p-6 backdrop-blur-sm ${
            theme === "light"
              ? "bg-black/5 border-black/10"
              : "bg-white/5 border-white/10"
          }`}
        >
          {/* Skeleton Header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-lg animate-pulse ${
                theme === "light" ? "bg-black/20" : "bg-white/20"
              }`}
            ></div>
            <div className="flex-1">
              <div
                className={`h-4 rounded animate-pulse mb-2 ${
                  theme === "light" ? "bg-black/20" : "bg-white/20"
                }`}
                style={{ width: "60%" }}
              ></div>
              <div
                className={`h-3 rounded animate-pulse ${
                  theme === "light" ? "bg-black/20" : "bg-white/20"
                }`}
                style={{ width: "40%" }}
              ></div>
            </div>
          </div>

          {/* Skeleton Content */}
          <div className="space-y-3">
            <div
              className={`h-3 rounded animate-pulse ${
                theme === "light" ? "bg-black/20" : "bg-white/20"
              }`}
              style={{ width: "100%" }}
            ></div>
            <div
              className={`h-3 rounded animate-pulse ${
                theme === "light" ? "bg-black/20" : "bg-white/20"
              }`}
              style={{ width: "85%" }}
            ></div>
            <div
              className={`h-3 rounded animate-pulse ${
                theme === "light" ? "bg-black/20" : "bg-white/20"
              }`}
              style={{ width: "70%" }}
            ></div>
            <div
              className={`h-3 rounded animate-pulse ${
                theme === "light" ? "bg-black/20" : "bg-white/20"
              }`}
              style={{ width: "90%" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (!contents || contents.length === 0) {
    return (
      <div className="h-full flex flex-col overflow-y-auto">
        <div
          className={`border rounded-2xl p-6 backdrop-blur-sm ${
            theme === "light"
              ? "bg-black/5 border-black/10"
              : "bg-white/5 border-white/10"
          }`}
        >
          <p
            className={`text-center ${
              theme === "light" ? "text-black/60" : "text-white/60"
            }`}
          >
            No relevant content found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-4 overflow-visible px-1">
      {contents.map((content) => (
        <div key={content._id} className="animate-fadeIn">
          {content.type === "note" ? (
            <NoteCard
              content={content}
              onUpdate={onUpdateContent}
              onDelete={onDeleteContent}
              compact={true}
              score={content.score}
            />
          ) : content.type === "website" ? (
            <WebsiteCard
              content={content}
              onDelete={() => onDeleteContent(content._id)}
              isShared={false}
              compact={true}
              score={content.score}
            />
          ) : (
            <Card
              id={content._id}
              link={content.link}
              type={content.type as "twitter" | "youtube"}
              tags={content.tags}
              createdAt={content.createdAt || content.updatedAt}
              score={content.score}
              onDelete={() => onDeleteContent(content._id)}
              isShared={false}
              compact={true}
            />
          )}
        </div>
      ))}
    </div>
  );
}
