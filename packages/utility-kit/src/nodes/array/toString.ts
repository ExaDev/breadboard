// - [`Array.prototype.toSorted()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)
//   - Returns a new array with the elements sorted in ascending order, without modifying the original array.
// - [`Array.prototype.toSpliced()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced)
//   - Returns a new array with some elements removed and/or replaced at a given index, without modifying the original array.
// - [`Array.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)
//   - Returns a string representing the calling array and its elements. Overrides the [`Object.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) method.
/**
 * 	toString
 * Returns a string representing the calling array and its elements. Overrides the `Object.prototype.toString()` method.
 * @param array - The array to convert.
 * @returns string - The string representation of the array.
 */

export function toString<T>({ array }: { array: T[] }): {
  string: string;
} {
  return { string: array.toString() };
}
