import { useEffect } from "react";
import { ShareIcnon } from "./icons/ShareIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { DeleteIcon } from "./icons/DeleteIcon";

interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter";
  onDelete?: () => void;
}

export function Card({ title, link, type, onDelete }: CardProps) {
  useEffect(() => {
    if (type === "twitter" && window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }
  }, [link, type]);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 flex w-full flex-col overflow-hidden hover:shadow-xl transition-all duration-300 dark:bg-dark-surface/90 dark:border-dark-border dark:shadow-2xl">
      <div className="flex px-4 sm:px-6 py-3 sm:py-4 justify-between items-center bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 dark:from-dark-surface dark:to-dark-surface-alt dark:border-dark-border">
        <div className="text-gray-700 flex items-center gap-2 sm:gap-3 font-medium min-w-0 flex-1 dark:text-dark-text">
          <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${type === "twitter" ? "bg-blue-100 dark:bg-blue-900/30" : "bg-red-100 dark:bg-red-900/30"}`}>
            {type === "twitter" ? <TwitterIcon /> : <YoutubeIcon />}
          </div>
          <span className="truncate text-sm sm:text-base">{title}</span>
        </div>
        <div className="flex text-gray-500 gap-2 sm:gap-3 flex-shrink-0 dark:text-dark-text-muted">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-purple-600 transition-colors p-1 dark:hover:text-dark-primary"
          >
            <ShareIcnon />
          </a>
          {onDelete && (
            <button 
              onClick={onDelete} 
              className="hover:text-red-500 transition-colors p-1 dark:hover:text-dark-error"
            >
              <DeleteIcon />
            </button>
          )}
        </div>
      </div>

      {type === "youtube" && (
        <div className="p-3 sm:p-4">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={link.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}

      {type === "twitter" && (
        <div className="p-3 sm:p-4">
          <blockquote className="twitter-tweet">
            <a href={link? link.replace("x.com", "twitter.com") : "#"}></a>
          </blockquote>
        </div>
      )}
    </div>
  );
}