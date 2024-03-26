/**
 * findIndex
 * Returns the index of the first element in the array that satisfies the provided testing function, or `-1` if no appropriate element was found.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to search.
 * @param {Function} inputs.predicate A predicate function to test each element of the array.
 * @returns {number} The index of the first element that satisfies the testing function.
 */
export function findIndex<T>({
  array,
  predicate, // TODO: add type for predicate
}: {
  array: T[];
  predicate: (value: T, index: number, array: T[]) => boolean;
}): {
  index: number;
} {
  return { index: array.findIndex(predicate) };
}
