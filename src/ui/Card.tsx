import { useEffect, useState } from "react";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { LinkIcon } from "./icons/LinkIcon";
import { EditIcon } from "./icons/EditIcon";
import { AlertTriangle } from "lucide-react";
import { UpdateContentModal, ContentType } from "../components/UpdateContentModal";

const isValidUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

interface CardProps {
  id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter";
  tags?: string[]; 
  onDelete?: () => void;
  isShared?: boolean;
  notes?: string;
}

export function Card({ id, title, link, type, tags, onDelete, isShared, notes }: CardProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditClick = () => setIsEditModalOpen(true);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (type === "twitter" && mounted && window.twttr?.widgets) {
      window.twttr.widgets.load();
    }
  }, [link, type, mounted, isDark]);

  const isValidLink = isValidUrl(link);

  return (
    <>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 flex w-full flex-col overflow-hidden hover:shadow-xl transition-all duration-300 dark:bg-dark-surface/90 dark:border-dark-border dark:shadow-2xl">
        <div className="flex px-4 sm:px-6 py-3 sm:py-4 justify-between items-center bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 dark:from-dark-surface dark:to-dark-surface-alt dark:border-dark-border">
          <div className="text-gray-700 flex items-center gap-2 sm:gap-3 font-medium min-w-0 flex-1 dark:text-dark-text">
            <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${type === "twitter" ? "bg-blue-100 dark:bg-white/10  dark:text-black" : "bg-red-100"}`}>
              {type === "twitter" ? <TwitterIcon /> : <YoutubeIcon />}
            </div>
            <span className="truncate text-sm sm:text-base">{title}</span>
          </div>
          
          <div className="flex text-gray-500 gap-2 sm:gap-3 flex-shrink-0 dark:text-dark-text-muted">
            {!isShared && (
              <button 
                onClick={handleEditClick} 
                className="hover:text-blue-500 transition-colors p-1 dark:hover:text-dark-primary"
              >
                <EditIcon />
              </button>
            )}
            {isValidLink ? (
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-purple-600 transition-colors p-1 dark:hover:text-dark-primary"
              >
                <LinkIcon />
              </a>
            ) : (
              <div className="p-1 text-red-500 dark:text-red-400" title="Invalid link">
                <AlertTriangle className="w-4 h-4" />
              </div>
            )}
            {!isShared && onDelete && (
              <button 
                onClick={onDelete} 
                className="hover:text-red-500 transition-colors p-1 dark:hover:text-dark-error"
              >
                <DeleteIcon />
              </button>
            )}
          </div>
        </div>
        
        {!isValidLink && (
          <div className="bg-red-100/80 border-l-4 border-red-500 text-red-700 p-3 mx-4 my-2 rounded text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>This content has an invalid or missing link</span>
          </div>
        )}
          
        {tags && tags.length > 0 && (
          <div className="px-4 sm:px-6 pt-2 flex flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-purple-600/10 text-purple-700 px-3 py-1 text-xs font-medium rounded-full dark:bg-purple-500/20 dark:text-purple-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {type === "youtube" && (
          <div className="p-3 sm:p-4">
            {isValidLink ? (
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
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-red-700 font-medium">Invalid YouTube Link</p>
                <p className="text-red-600 text-sm mt-1">This video cannot be displayed due to an invalid URL</p>
              </div>
            )}
          </div>
        )}

        {type === "twitter" && mounted && (
          <div className="p-3 sm:p-4">
            {isValidLink ? (
              <blockquote
                className="twitter-tweet"
                key={`tweet-${isDark ? "dark" : "light"}-${link}`}
                data-theme={isDark ? "dark" : "light"}
              >
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-blue-700 font-medium">Invalid Twitter Link</p>
                <p className="text-blue-600 text-sm mt-1">This tweet cannot be displayed due to an invalid URL</p>
              </div>
            )}
          </div>
        )}
        {notes && (
          <div className="px-4 sm:px-6 py-2 text-sm text-gray-700 dark:text-dark-text-muted border-t border-gray-100 dark:border-dark-border">
            <p className="font-medium text-gray-800 dark:text-dark-text mb-1">📝 Note</p>
            <p>{notes}</p>
          </div>
        )}
      </div>
      <UpdateContentModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        contentId={id}
        initialTitle={title}
        initialLink={link}  
        initialType={type as ContentType}
        onOpen={() => console.log("Update modal opened")}
      />
    </>
  );
}
