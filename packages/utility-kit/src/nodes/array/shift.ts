// - [`Array.prototype.shift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
//   - Removes the first element from an array and returns that element.
/**
 * shift
 * Removes the first element from an array and returns that element.
 * @param array - The array to shift.
 * @returns first - The first element of the array.
 */

export function shift<T>(inputs: { array: T[] }): {
  first: T | undefined;
  array: T[];
} {
  const { array } = inputs;
  const first = array.shift();
  return {
    first,
    array,
  };
}
