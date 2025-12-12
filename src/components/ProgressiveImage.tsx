import { useState, useRef, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function ProgressiveImage({
  src,
  alt,
  className = "",
  placeholder,
  onLoad,
  onError,
}: ProgressiveImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder || "");
  const { theme } = useTheme();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) return;

    const img = new Image();

    img.onload = () => {
      setCurrentSrc(src);
      setImageLoaded(true);
      onLoad?.();
    };

    img.onerror = () => {
      setImageError(true);
      onError?.();
    };

    img.src = src;
  }, [src, onLoad, onError]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Loading State */}
      {!imageLoaded && !imageError && (
        <div
          className={`absolute inset-0 animate-pulse ${
            theme === "light" ? "bg-gray-200" : "bg-white/10"
          }`}
        >
          <div className="flex items-center justify-center h-full">
            <div
              className={`w-8 h-8 rounded-full border-2 border-t-transparent animate-spin ${
                theme === "light" ? "border-gray-400" : "border-white/40"
              }`}
            />
          </div>
        </div>
      )}

      {/* Error State */}
      {imageError && (
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            theme === "light" ? "bg-gray-100" : "bg-white/5"
          }`}
        >
          <div className="text-center">
            <div
              className={`w-8 h-8 mx-auto mb-2 ${
                theme === "light" ? "text-gray-400" : "text-white/40"
              }`}
            >
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p
              className={`text-xs ${
                theme === "light" ? "text-gray-500" : "text-white/50"
              }`}
            >
              Preview unavailable
            </p>
          </div>
        </div>
      )}

      {/* Actual Image */}
      {currentSrc && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}

// Website Preview Component with Progressive Loading
interface WebsitePreviewProps {
  url: string;
  className?: string;
}

export function WebsitePreview({ url, className = "" }: WebsitePreviewProps) {
  const { theme } = useTheme();

  // Extract domain from URL
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  const domain = getDomain(url);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <div
      className={`w-full h-48 flex items-center justify-center ${
        theme === "light"
          ? "bg-gradient-to-br from-blue-50 to-indigo-100"
          : "bg-gradient-to-br from-blue-900/20 to-indigo-900/20"
      } ${className}`}
    >
      <div className="text-center p-6">
        {/* Favicon */}
        <div className="mb-4">
          <ProgressiveImage
            src={faviconUrl}
            alt={`${domain} favicon`}
            className="w-12 h-12 mx-auto rounded-lg"
            onLoad={() => {}}
            onError={() => {}}
          />
        </div>

        {/* Domain name */}
        <h3
          className={`text-lg font-semibold mb-2 ${
            theme === "light" ? "text-gray-800" : "text-white"
          }`}
        >
          {domain}
        </h3>

        {/* URL */}
        <p
          className={`text-sm ${
            theme === "light" ? "text-gray-600" : "text-gray-300"
          }`}
        >
          {url.length > 50 ? `${url.substring(0, 50)}...` : url}
        </p>

        {/* Link icon */}
        <div
          className={`mt-4 w-8 h-8 mx-auto ${
            theme === "light" ? "text-gray-400" : "text-white/40"
          }`}
        >
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
