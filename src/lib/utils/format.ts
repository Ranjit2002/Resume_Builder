/**
 * Formats URLs for clean, professional display on resumes.
 * Strips http://, https://, www., and trailing slashes.
 * e.g., "https://linkedin.com/in/alexrivera-dev/" -> "linkedin.com/in/alexrivera-dev"
 * e.g., "https://github.com/alexrivera" -> "github.com/alexrivera"
 */
export function formatDisplayUrl(url?: string): string {
  if (!url) return "";
  return url
    .trim()
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/+$/, "");
}
