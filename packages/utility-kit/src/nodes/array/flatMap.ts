// - [`Array.prototype.flatMap()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
//   - Returns a new array formed by applying a given callback function to each element of the calling array, and then flattening the result by one level.
/**
 * flatMap
 * Returns a new array formed by applying a given callback function to each element of the calling array, and then flattening the result by one level.
 * @param array - The array to map.
 * @param callback - A function that produces an element of the new array.
 * @returns array - The mapped array.
 */

export function flatMap<T, U>({
  array,
  callbackFn, // TODO: add type for callbackFn
}: {
  array: T[];
  callbackFn: (value: T, index: number, array: T[]) => U[];
}): {
  array: U[];
} {
  return { array: array.flatMap(callbackFn) };
}
