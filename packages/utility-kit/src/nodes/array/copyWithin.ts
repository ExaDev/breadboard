// - [`Array.prototype.copyWithin()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)
//   - Copies a sequence of array elements within an array.
/**
 * copyWithin
 * Copies a sequence of array elements within an array.
 * @param array - The array to copy within.
 * @param target - The index at which to copy the sequence.
 * @param start - The index at which to start copying elements from.
 * @param end - The index at which to stop copying elements from.
 * @returns array - The array with the copied elements.
 */

export function copyWithin<T>({
  array,
  target,
  start = 0,
  end = array.length,
}: {
  array: T[];
  target: number;
  start?: number;
  end?: number;
}): {
  array: T[];
} {
  return { array: array.copyWithin(target, start, end) };
}
