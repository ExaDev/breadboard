// - [`Array.prototype.includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
//   - Determines whether the calling array contains a value, returning `true` or `false` as appropriate.
/**
 * includes
 * Determines whether the calling array contains a value, returning `true` or `false` as appropriate.
 * @param array - The array to check.
 * @param value - The value to search for.
 * @returns `true` if the value is found, `false` otherwise.
 */

export function includes<T>({ array, value }: { array: T[]; value: T }): {
  includes: boolean;
} {
  return { includes: array.includes(value) };
}
