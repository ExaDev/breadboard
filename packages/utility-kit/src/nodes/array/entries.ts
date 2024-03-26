// - [`Array.prototype.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)
//   - Returns a new [_array iterator_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators) object that contains the key/value pairs for each index in an array.
/**
 * entries
 * Returns a new array iterator object that contains the key/value pairs for each index in an array.
 * @param array - The array to get the entries from.
 * @returns entries - The array iterator object.
 */

export function entries<T>({ array }: { array: T[] }): {
  entries: IterableIterator<[number, T]>;
} {
  return { entries: array.entries() };
}
