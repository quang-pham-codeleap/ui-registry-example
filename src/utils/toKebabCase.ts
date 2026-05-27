export default function toKebabCase(str: string) {
  return str
    .replace(/([A-Z])/g, '-$1') // Add hyphen before each capital letter
    .toLowerCase() // Convert to lowercase
    .replace(/^-/, ''); // Remove leading hyphen if present
}
