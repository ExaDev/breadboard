// - [`Array.prototype.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)
//   - Returns a new [_array iterator_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators) that contains the keys for each index in the calling array.
/**
 * keys
 * Returns a new array iterator that contains the keys for each index in the calling array.
 * @param array - The array to get the keys from.
 * @returns keys - The array iterator object.
 */

export function keys<T>({ array }: { array: T[] }): {
  keys: IterableIterator<number>;
} {
  return { keys: array.keys() };
}
