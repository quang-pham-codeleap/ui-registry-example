/**
 * Detects if a URL is a Vimeo video and extracts the video ID.
 * Supports various Vimeo URL formats.
 *
 * @param url - The URL to check
 * @returns The video ID if Vimeo URL, null otherwise
 */
export default function getVimeoVideoId(url: string): string | null {
  const patterns = [/vimeo\.com\/(\d+)/, /player\.vimeo\.com\/video\/(\d+)/];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}
