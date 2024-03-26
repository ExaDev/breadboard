// - [`length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
//   - Reflects the number of elements in an array.
/**
 * length - Reflects the number of elements in an array.
 * @param array - The array to check.
 * @returns The number of elements in the array.
 */

export function length<T>(inputs: { array: T[] }): {
  length: number;
} {
  const { array } = inputs;
  return {
    length: array.length,
  };
}
