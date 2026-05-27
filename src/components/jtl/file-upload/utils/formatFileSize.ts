/**
 * Format a given number of bytes to a human-readable format.
 *
 * @param {number} bytes
 * @returns {string} formatted string
 */
export default function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))}${units[i]}`;
}
