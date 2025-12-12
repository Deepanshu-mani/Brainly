/**
 * Automatically detect content type from URL
 */
export function detectContentType(
  url: string,
): "youtube" | "twitter" | "website" | null {
  if (!url || url.trim() === "") return null;

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // YouTube detection
    if (
      hostname.includes("youtube.com") ||
      hostname.includes("youtu.be") ||
      hostname.includes("m.youtube.com")
    ) {
      return "youtube";
    }

    // Twitter/X detection
    if (
      hostname.includes("twitter.com") ||
      hostname.includes("x.com") ||
      hostname.includes("mobile.twitter.com")
    ) {
      return "twitter";
    }

    // Everything else is a website
    return "website";
  } catch {
    // Invalid URL
    return null;
  }
}

/**
 * Validate if a string is a valid URL
 */
export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}
