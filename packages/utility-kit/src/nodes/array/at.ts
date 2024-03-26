// ### [Instance methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods)
// - [`Array.prototype.at()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)
//   - Returns the array item at the given index. Accepts negative integers, which count back from the last item.
/**
 *  at
 * Returns the array item at the given index. Accepts negative integers, which count back from the last item.
 * @param array - The array to check.
 * @param index - The index of the item to return.
 * @returns The item at the given index.
 */

export function at<T>(inputs: { array: T[]; index: number }): {
  value: T | undefined;
} {
  const { array, index } = inputs;
  return { value: array.at(index) };
}
