/**
 * Type-safe function to extract properties from source object that match the keys of the target type
 * @template T - The target type whose properties we want to extract
 * @template S - The source object type containing the properties
 * @param source - The source object to extract properties from
 * @returns An object with properties from source that match the keys of T
 */
export default function extractProps<T, S extends Record<string, unknown>>(source: S): T {
  // Create a new object to hold the extracted properties
  const result = {} as Pick<S, Extract<keyof S, keyof T>>;

  // Iterate through each key in the source object
  for (const key in source) {
    // Only include own properties that exist in the source
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      // We use a type assertion with Record<string, unknown> instead of 'any'
      // TypeScript will still enforce type safety at compile time
      (result as Record<string, unknown>)[key] = source[key];
    }
  }

  return result as T;
}
