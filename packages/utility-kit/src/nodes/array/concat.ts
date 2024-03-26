// - [`Array.prototype.concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
//   - Returns a new array that is the calling array joined with other array(s) and/or value(s).
/**
 * concat - Returns a new array that is the calling array joined with other array(s) and/or value(s).
 * @param array - The array to concatenate.
 * @param prepend - The array to prepend.
 * @param append - The array to append.
 * @returns array - The concatenated array.
 */

export function concat<T>({
  array,
  prepend = [],
  append = [],
}: {
  array: T[];
  prepend?: T[];
  append?: T[];
}): {
  array: T[];
} {
  return { array: array.concat(prepend, append) };
}
