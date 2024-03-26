// - [`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
//   - Returns a new array containing the results of invoking a function on every element in the calling array.
/**
 * map
 * Returns a new array containing the results of invoking a function on every element in the calling array.
 * @param array - The array to map.
 * @param callback - A function to call for each element.
 * @returns array - The mapped array.
 */

export function map<T, U>({
  array,
  callbackFn, // TODO: add type for callback
}: {
  array: T[];
  callbackFn: (value: T, index: number, array: T[]) => U;
}): {
  array: U[];
} {
  return { array: array.map(callbackFn) };
}
