/**
 * A powerful utility type that generates all possible dot-notation path strings for accessing properties in a type.
 *
 * This type recursively traverses the structure of type T and produces a union of all valid path strings that could
 * be used to access properties, including nested properties and array elements.
 *
 * Features:
 * 1. Handles nested object properties (e.g., 'user.address.street')
 * 2. Handles array properties and their elements (e.g., 'comments', 'comments.0', 'comments.0.text')
 * 3. Converts optional properties to required to ensure all paths are generated
 * 4. Works with complex nested structures of arbitrary depth
 *
 * The type works by:
 * - Converting T to a Required<T> to handle optional properties
 * - Iterating through each key in the type
 * - For array properties, generating paths for array itself and its elements
 * - For object properties, recursively generating paths for nested properties
 * - For primitive properties, just using the key itself
 *
 * @template T - The type to generate paths for
 * @template R - Internal parameter used for recursion (defaults to Required<T>)
 * @returns A union of all possible path strings for the type
 *
 * @example
 * // Simple object
 * type User = { name: string; age: number };
 * type UserPaths = PathsToString<User>; // 'name' | 'age'
 *
 * @example
 * // Nested object
 * type User = {
 *   name: string;
 *   address: { city: string; zip: number }
 * };
 * type UserPaths = PathsToString<User>;
 * // 'name' | 'address' | 'address.city' | 'address.zip'
 *
 * @example
 * // With arrays
 * type Post = {
 *   title: string;
 *   comments: Array<{ id: number; text: string }>
 * };
 * type PostPaths = PathsToString<Post>;
 * // 'title' | 'comments' | 'comments.0' | 'comments.0.id' | 'comments.0.text'
 */
type PathsToString<T, R = Required<T>> = T extends object
  ? {
      // Iterate over each key in the required type
      [K in keyof R]: K extends string
        ? // If the key is an array
          R[K] extends Array<infer U>
          ? U extends object
            ? // If the array elements are objects, generate nested paths
              `${K}` | `${K}.${number}` | `${K}.${number}.${PathsToString<U>}`
            : `${K}`
          : // If the key is an object
            R[K] extends object
            ? // If the object is an object, generate nested paths
              `${K}` | `${K}.${PathsToString<R[K]>}`
            : `${K}`
        : never;
    }[keyof R]
  : never;

export default PathsToString;
