/**
 * Normalises a URL string by adding a protocol if missing and validating against a whitelist.
 *
 * @param rawUrl - The raw URL string to normalise.
 * @returns Refined URL with protocol, or an empty string if invalid/unsafe.
 */
export default function normaliseUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();

  if (!trimmed) {
    return '';
  }

  // If a protocol is present, only allow a safe whitelist (http, https, mailto, tel, ftp).
  const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed);

  if (hasProtocol) {
    const safeProtocolPattern = /^(https?|mailto|tel|ftp):/i;

    if (!safeProtocolPattern.test(trimmed)) {
      // Unsafe or unknown protocol (e.g. javascript:, data:, vbscript:) — reject.
      return '';
    }

    return trimmed;
  }

  // No protocol specified — default to https://
  return `https://${trimmed}`;
}
