/**
 * findLastIndex
 * Returns the index of the last element in the array that satisfies the provided testing function, or `-1` if no appropriate element was found.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to search.
 * @param {Function} inputs.predicate The function to test for each element.
 * @returns {number} The index of the last element in the array that satisfies the provided testing function, or `-1` if no appropriate element was found.
 */
export function findLastIndex<T>({
  array,
  predicate, // TODO: add type for predicate
}: {
  array: T[];
  predicate: (value: T, index: number, array: T[]) => boolean;
}): {
  index: number;
} {
  return { index: array.reverse().findIndex(predicate) };
}
