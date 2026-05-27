import GetTypeOfField from '../types/GetTypeOfField';

/**
 * Safely accesses a nested property in an object using a path string
 * For example: getNestedValue({ a: { b: { c: 1 } } }, "a.b.c") returns 1
 *
 * @param obj - The object to access nested properties from
 * @param path - The path string using dot notation (e.g., "a.b.c")
 * @returns The value at the nested path, or undefined if not found
 */
export default function getNestedValue<T extends object, P extends string>(obj: T, path: P): GetTypeOfField<T, P> | undefined {
  if (!path) return undefined;

  // Handle array indices in path (e.g., "items.0.name")
  const parts = path.split('.').map(part => {
    // Check if part is a number (array index)
    const idx = Number(part);
    return !isNaN(idx) ? idx : part;
  });

  let result: unknown = obj;

  for (const part of parts) {
    if (result === null || result === undefined) {
      return undefined;
    }

    // Use type assertion for indexing, since we're checking for valid objects/arrays
    if (typeof result === 'object') {
      result = (result as Record<string | number, unknown>)[part];
    } else {
      return undefined;
    }
  }

  return result as GetTypeOfField<T, P>;
}
