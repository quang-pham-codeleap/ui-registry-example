// Helper function to convert kebab-case to camelCase
export default function kebabToCamelCase(str: string): string {
  if (str.split('-').length === 1) return str;
  return str
    .split('-')
    .map((word, index) => (index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()))
    .join('');
}
