// - [`Array.prototype.some()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
//   - Returns `true` if at least one element in the calling array satisfies the provided testing function.
/**
 * some
 * Returns `true` if at least one element in the calling array satisfies the provided testing function.
 * @param array - The array to check.
 * @param callback - A predicate function to test each element of the array.
 * @returns `true` if at least one element in the calling array satisfies the testing function.
 */

export function some<T>({
  array,
  callback: predicate, // TODO: add type for callback
}: {
  array: T[];
  callback: (value: T, index: number, array: T[]) => boolean;
}): {
  some: boolean;
} {
  return { some: array.some(predicate) };
}
