// - [`Array.prototype.lastIndexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
//   - Returns the last (greatest) index at which a given element can be found in the calling array, or `-1` if none is found.
/**
 * lastIndexOf
 * Returns the last (greatest) index at which a given element can be found in the calling array, or `-1` if none is found.
 * @param array - The array to search.
 * @param value - The value to search for.
 * @returns index - The index of the last occurrence of the value.
 */

export function lastIndexOf<T>({ array, value }: { array: T[]; value: T }): {
  index: number;
} {
  return { index: array.lastIndexOf(value) };
}
