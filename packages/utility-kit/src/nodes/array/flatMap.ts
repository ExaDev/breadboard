/**
 * flatMap
 * Returns a new array formed by applying a given callback function to each element of the calling array, and then flattening the result by one level.
 * @template T The type of the array items.
 * @template U The type of the array items after applying the callback function.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to map.
 * @param {Function} inputs.callbackFn The function to apply to each element of the array.
 * @returns {Array<U>} A new array formed by applying a given callback function to each element of the calling array, and then flattening the result by one level.
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
