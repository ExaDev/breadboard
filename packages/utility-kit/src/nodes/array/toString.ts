/**
 * 	toString
 * Returns a string representing the calling array and its elements. Overrides the `Object.prototype.toString()` method.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to convert to a string.
 * @returns {string} A string representing the calling array and its elements.
 */
export function toString<T>({ array }: { array: T[] }): {
  string: string;
} {
  return { string: array.toString() };
}
