/**
 * map
 * Returns a new array containing the results of invoking a function on every element in the calling array.
 * @template T The type of the array items.
 * @template U The type of the new array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to map.
 * @param {Function} inputs.callbackFn The function to invoke on each element.
 * @returns {Array<U>} A new array containing the results of invoking a function on every element in the calling array.
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
