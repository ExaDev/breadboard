// - [`Array.prototype.findLastIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex)
//   - Returns the index of the last element in the array that satisfies the provided testing function, or `-1` if no appropriate element was found.
/**
 * findLastIndex
 * Returns the index of the last element in the array that satisfies the provided testing function, or `-1` if no appropriate element was found.
 * @param array - The array to search.
 * @param callback - A predicate function to test each element of the array.
 * @returns index - The index of the last element that satisfies the testing function.
 */

export function findLastIndex<T>({
  array,
  predicate, // TODO: add type for predicate
}: {
  array: T[];
  predicate: (value: T, index: number, array: T[]) => boolean;
}): {
  index: number;
} {
  return { index: array.reverse().findIndex(predicate) };
}
