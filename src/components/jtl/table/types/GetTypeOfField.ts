/**
 * A recursive utility type that resolves the type of a value at a specified path within an object or array.
 *
 * This type handles:
 * 1. Nested object properties using dot notation (e.g., 'user.address.street')
 * 2. Array indexing using numeric strings (e.g., 'items.0.name')
 * 3. Proper type inference for both objects and arrays
 * 4. Undefined handling for optional properties
 *
 * The type works by recursively parsing the path string and traversing the type structure:
 * - For dot-separated paths, it splits the path into the current key and the rest
 * - For object properties, it checks if the key exists and continues with the nested type
 * - For array indices, it extracts the array element type and continues
 * - For the base case (no more dots), it returns the type at the final key
 *
 * @template T - The type of the object or array to extract a value from
 * @template Path - A string literal type representing the path to the desired property
 * @returns The type of the value at the specified path
 *
 * @example
 * // Basic object property
 * type User = { name: string; age: number };
 * type NameType = GetTypeOfField<User, 'name'>; // string
 *
 * @example
 * // Nested object property
 * type User = { address: { city: string; zip: number } };
 * type CityType = GetTypeOfField<User, 'address.city'>; // string
 *
 * @example
 * // Array element
 * type Post = { comments: Array<{ id: number; text: string }> };
 * type CommentType = GetTypeOfField<Post, 'comments.0.text'>; // string
 */
type GetTypeOfField<T, Path extends string> = Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? T[Key] extends undefined
      ? undefined
      : GetTypeOfField<NonNullable<T[Key]>, Rest>
    : Key extends `${number}`
      ? T extends Array<infer U>
        ? GetTypeOfField<U, Rest>
        : never
      : never
  : Path extends keyof T
    ? T[Path]
    : Path extends `${number}`
      ? T extends Array<infer U>
        ? U
        : never
      : never;

export default GetTypeOfField;
