/**
 * Detects if a URL is a YouTube video and extracts the video ID.
 * Supports various YouTube URL formats.
 *
 * @param url - The URL to check
 * @returns The video ID if YouTube URL, null otherwise
 */
export default function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}
