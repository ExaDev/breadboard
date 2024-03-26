// - [`Array.prototype.findLast()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)
//   - Returns the value of the last element in the array that satisfies the provided testing function, or `undefined` if no appropriate element is found.
/**
 * findLast
 * Returns the value of the last element in the array that satisfies the provided testing function, or `undefined` if no appropriate element is found.
 * @param array - The array to search.
 * @param callback - A predicate function to test each element of the array.
 * @returns value - The value of the last element that satisfies the testing function.
 */

export function findLast<T>({
  array,
  predicate, // TODO: add type for predicate
}: {
  array: T[];
  predicate: (value: T, index: number, array: T[]) => boolean;
}): {
  value: T | undefined;
} {
  return { value: array.reverse().find(predicate) };
}
