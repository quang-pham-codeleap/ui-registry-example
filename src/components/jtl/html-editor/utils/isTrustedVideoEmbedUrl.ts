/**
 * Checks if a URL belongs to a trusted video embed platform (YouTube or Vimeo)
 * by parsing the URL and checking the actual hostname.
 *
 * Uses `new URL()` instead of `String.includes()` to prevent incomplete
 * substring sanitization — e.g., `evil.com/youtube.com/path` would pass an
 * `includes('youtube.com')` check but has `evil.com` as its actual host.
 *
 * Trusted hosts: `youtube.com`, `*.youtube.com`, `vimeo.com`, `*.vimeo.com`
 *
 * @param src - The iframe src URL to validate
 * @returns `true` if the URL is a trusted YouTube or Vimeo embed
 */
export default function isTrustedVideoEmbedUrl(src: string): boolean {
  try {
    const { hostname } = new URL(src);
    const isYouTube = hostname === 'youtube.com' || hostname.endsWith('.youtube.com');
    const isVimeo = hostname === 'vimeo.com' || hostname.endsWith('.vimeo.com');
    return isYouTube || isVimeo;
  } catch {
    // If URL parsing fails, the src is invalid — reject it.
    return false;
  }
}
