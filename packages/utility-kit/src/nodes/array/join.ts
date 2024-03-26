// - [`Array.prototype.join()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
//   - Joins all elements of an array into a string.
/**
 * join
 * Joins all elements of an array into a string.
 * @param array - The array to join.
 * @param separator - The string to separate each element.
 * @returns string - The joined string.
 */

export function join<T>({
  array,
  separator = ",",
}: {
  array: T[];
  separator?: string;
}): {
  string: string;
} {
  return { string: array.join(separator) };
}
