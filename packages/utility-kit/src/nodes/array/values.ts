// - [`Array.prototype.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values)
//   - Returns a new [_array iterator_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators) object that contains the values for each index in the array.
/**
 * values
 * Returns a new array iterator object that contains the values for each index in the array.
 * @param array - The array to get the values from.
 * @returns values - The array iterator object.
 */

export function values<T>({ array }: { array: T[] }): {
  values: IterableIterator<T>;
} {
  return { values: array.values() };
}
