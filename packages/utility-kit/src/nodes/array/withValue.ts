// - [`Array.prototype.with()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with)
//   - Returns a new array with the element at the given index replaced with the given value, without modifying the original array.
/**
 * with
 * Returns a new array with the element at the given index replaced with the given value, without modifying the original array.
 * @param array - The array to modify.
 * @param index - The index of the element to replace.
 * @param value - The value to replace the element with.
 * @returns array - The modified array.
 */

export function withValue<T>({
  array,
  index,
  value,
}: {
  array: T[];
  index: number;
  value: T;
}): {
  array: T[];
} {
  const newArray = array.slice();
  newArray[index] = value;
  return { array: newArray };
}
