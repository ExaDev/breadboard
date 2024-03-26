// - [`Array.prototype.every()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
//   - Returns `true` if every element in the calling array satisfies the testing function.
/**
 * every
 * Returns `true` if every element in the calling array satisfies the testing function.
 * @param array - The array to check.
 * @param callback - A predicate function to test each element of the array.
 * @returns `true` if every element in the calling array satisfies the testing function.
 */

export function every<T>({
  array,
  predicate, // TODO: add type for predicate
}: {
  array: T[];
  predicate: (value: T, index: number, array: T[]) => boolean;
}): {
  every: boolean;
} {
  return { every: array.every(predicate) };
}
