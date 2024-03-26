// - [`Array.prototype.push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
//   - Adds one or more elements to the end of an array, and returns the new `length` of the array.
/**
 * push
 * Adds one or more elements to the end of an array, and returns the new `length` of the array.
 * @param array - The array to push.
 * @param elements - The elements to add.
 * @returns array - The array with the added elements.
 */

export function push<T>({
  array,
  elements,
}: {
  array: T[];
  elements: T | T[];
}): {
  array: T[];
} {
  return { array: array.concat(elements) };
}
