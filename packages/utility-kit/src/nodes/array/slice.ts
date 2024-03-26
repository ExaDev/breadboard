// - [`Array.prototype.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
//   - Extracts a section of the calling array and returns a new array.
/**
 * slice
 * Extracts a section of the calling array and returns a new array.
 * @param array - The array to slice.
 * @param start - The index at which to begin extraction.
 * @param end - The index at which to end extraction.
 * @returns array - The sliced array.
 */

export function slice<T>({
  array,
  start = 0,
  end = array.length,
}: {
  array: T[];
  start?: number;
  end?: number;
}): {
  array: T[];
} {
  return { array: array.slice(start, end) };
}
