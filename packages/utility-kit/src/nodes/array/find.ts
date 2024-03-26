/**
 * find
 * Returns the value of the first element in the array that satisfies the provided testing function, or `undefined` if no appropriate element is found.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to search.
 * @param {Function} inputs.predicate The function to test for each element.
 * @returns {T | undefined} The value of the first element in the array that satisfies the provided testing function.
 */
export function find<T>({
  array,
  predicate, // TODO: add type for predicate
}: {
  array: T[];
  predicate: (value: T, index: number, array: T[]) => boolean;
}): {
  value: T | undefined;
} {
  return { value: array.find(predicate) };
}
