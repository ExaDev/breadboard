// - [`Array.prototype.reverse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
//   - Reverses the order of the elements of an array _in place_. (First becomes the last, last becomes first.)
/**
 * reverse
 * Reverses the order of the elements of an array _in place_. (First becomes the last, last becomes first.)
 * @param array - The array to reverse.
 * @returns array - The reversed array.
 */

export function reverse<T>({ array }: { array: T[] }): {
  array: T[];
} {
  return { array: array.reverse() };
}
