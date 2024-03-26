/**
 * filter
 * Returns a new array containing all elements of the calling array for which the provided filtering function returns `true`.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to filter.
 * @param {Function} inputs.predicate The function to test each element of the array.
 * @returns {Array<T>} A new array containing all elements of the calling array for which the provided filtering function returns `true`.
 */

export function filter<T>({
  array,
  predicate, // TODO: add type for predicate
}: {
  array: T[];
  predicate: (value: T, index: number, array: T[]) => boolean;
}): {
  array: T[];
} {
  return { array: array.filter(predicate) };
}
