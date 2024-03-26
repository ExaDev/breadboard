// - [`Array.prototype.indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
//   - Returns the first (least) index at which a given element can be found in the calling array.
/**
 * indexOf
 * Returns the first (least) index at which a given element can be found in the calling array.
 * @param array - The array to search.
 * @param value - The value to search for.
 * @returns index - The index of the first occurrence of the value.
 */

export function indexOf<T>({ array, value }: { array: T[]; value: T }): {
  index: number;
} {
  return { index: array.indexOf(value) };
}
