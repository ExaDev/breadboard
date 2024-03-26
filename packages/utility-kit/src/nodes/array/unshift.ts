// - [`Array.prototype.unshift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
//   - Adds one or more elements to the front of an array, and returns the new `length` of the array.
/**
 * unshift
 * Adds one or more elements to the front of an array, and returns the new `length` of the array.
 * @param array - The array to unshift.
 * @param elements - The elements to add.
 * @returns array - The array with the added elements.
 */

export function unshift<T>({
  array,
  elements,
}: {
  array: T[];
  elements: T[];
}): {
  array: T[];
} {
  array.unshift(...elements);
  return { array };
}
