// ## [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
// - [`Array.isArray()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
//   - Returns `true` if the argument is an array, or `false` otherwise.
/**
 * isArray - Returns `true` if the argument is an array, or `false` otherwise.
 * @param value - The value to check.
 * @returns `true` if the argument is an array, or `false` otherwise.
 */

export function isArray<T>({ value }: { value: T[] }): {
  isArray: boolean;
} {
  return {
    isArray: Array.isArray(value),
  };
}
