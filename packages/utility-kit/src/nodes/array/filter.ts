// - [`Array.prototype.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
//   - Returns a new array containing all elements of the calling array for which the provided filtering function returns `true`.
/**
 * filter
 * Returns a new array containing all elements of the calling array for which the provided filtering function returns `true`.
 * @param array - The array to filter.
 * @param callback - A predicate function to test each element of the array.
 * @returns array - The filtered array.
 */

export function filter<T>({
  array,
  predicate, // TODO: add type for predicate
}: {
  array: T[];
  predicate: (value: T, index: number, array: T[]) => boolean;
}): {
  array: T[];
} {
  return { array: array.filter(predicate) };
}
