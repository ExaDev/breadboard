/**
 * sort
 * Sorts the elements of an array in place and returns the array.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to sort.
 * @param {Function} [inputs.compareFunction] The function that defines the sort order.
 * @returns {Array<T>} The sorted array.
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
