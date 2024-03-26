// - [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
//   - Executes a user-supplied "reducer" callback function on each element of the array (from left to right), to reduce it to a single value.
/**
 * reduce
 * Executes a user-supplied "reducer" callback function on each element of the array (from left to right), to reduce it to a single value.
 * @param array - The array to reduce.
 * @param callback - A function to execute on each element.
 * @param initialValue - The initial value to use.
 * @returns value - The reduced value.
 */

export function reduce<T, U>({
  array,
  callbackFn, // TODO: add type for callback
  initialValue,
}: {
  array: T[];
  callbackFn: (accumulator: U, value: T, index: number, array: T[]) => U;
  initialValue: U;
}): {
  value: U;
} {
  return { value: array.reduce(callbackFn, initialValue) };
}
