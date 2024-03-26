// - [`Array.prototype.pop()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
//   - Removes the last element from an array and returns that element.
/**
 * pop
 * Removes the last element from an array and returns that element.
 * @param array - The array to pop.
 * @returns last - The last element of the array.
 */

export function pop<T>(inputs: { array: T[] }): {
  last: T | undefined;
  array: T[];
} {
  const { array } = inputs;
  const last = array.pop();
  return {
    last,
    array,
  };
}
