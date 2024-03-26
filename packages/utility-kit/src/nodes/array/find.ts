// - [`Array.prototype.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
//   - Returns the value of the first element in the array that satisfies the provided testing function, or `undefined` if no appropriate element is found.
/**
 * find
 * Returns the value of the first element in the array that satisfies the provided testing function, or `undefined` if no appropriate element is found.
 * @param array - The array to search.
 * @param callback - A predicate function to test each element of the array.
 * @returns value - The value of the first element that satisfies the testing function.
 */

export function find<T>({
  array,
  predicate, // TODO: add type for predicate
}: {
  array: T[];
  predicate: (value: T, index: number, array: T[]) => boolean;
}): {
  value: T | undefined;
} {
  return { value: array.find(predicate) };
}
