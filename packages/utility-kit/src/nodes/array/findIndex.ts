// - [`Array.prototype.findIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
//   - Returns the index of the first element in the array that satisfies the provided testing function, or `-1` if no appropriate element was found.
/**
 * findIndex
 * Returns the index of the first element in the array that satisfies the provided testing function, or `-1` if no appropriate element was found.
 * @param array - The array to search.
 * @param callback - A predicate function to test each element of the array.
 * @returns index - The index of the first element that satisfies the testing function.
 */

export function findIndex<T>({
  array,
  predicate, // TODO: add type for predicate
}: {
  array: T[];
  predicate: (value: T, index: number, array: T[]) => boolean;
}): {
  index: number;
} {
  return { index: array.findIndex(predicate) };
}
