// - [`Array.prototype.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
//   - Sorts the elements of an array in place and returns the array.
/**
 * sort
 * Sorts the elements of an array in place and returns the array.
 * @param array - The array to sort.
 * @param compareFunction - A function that defines the sort order.
 * @returns array - The sorted array.
 */

export function sort<T>({
  array,
  compareFunction: compareFn,
}: {
  array: T[];
  compareFunction?: (a: T, b: T) => number;
}): {
  array: T[];
} {
  return { array: array.sort(compareFn) };
}
