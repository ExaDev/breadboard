// - [`Array.prototype.splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
//   - Adds and/or removes elements from an array.
/**
 * splice
 * Adds and/or removes elements from an array.
 * @param array - The array to splice.
 * @param start - The index at which to start changing the array.
 * @param deleteCount - The number of elements to remove.
 * @param elements - The elements to add.
 * @returns array - The spliced array.
 */

export function splice<T>({
  array,
  start,
  deleteCount = 0,
  elements = [],
}: {
  array: T[];
  start: number;
  deleteCount?: number;
  elements?: T[];
}): {
  array: T[];
} {
  return { array: array.splice(start, deleteCount, ...elements) };
}
