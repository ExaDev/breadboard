/**
 * toLocaleString
 * Returns a localized string representing the calling array and its elements. Overrides the `Object.prototype.toLocaleString()` method.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to convert to a localized string.
 * @returns {string} A localized string representing the calling array and its elements.
 */
export function toLocaleString<T>({ array }: { array: T[] }): {
  string: string;
} {
  return { string: array.toLocaleString() };
}
