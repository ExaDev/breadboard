// - [`Array.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)
//   - Returns a localized string representing the calling array and its elements. Overrides the [`Object.prototype.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString) method.
/**
 * toLocaleString
 * Returns a localized string representing the calling array and its elements. Overrides the `Object.prototype.toLocaleString()` method.
 * @param array - The array to convert.
 * @returns string - The localized string.
 */

export function toLocaleString<T>({ array }: { array: T[] }): {
  string: string;
} {
  return { string: array.toLocaleString() };
}
