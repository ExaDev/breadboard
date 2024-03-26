/**
 * every
 * Returns `true` if every element in the calling array satisfies the testing function.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to check.
 * @param {Function} inputs.predicate The function to test for each element.
 * @returns {boolean} `true` if every element in the calling array satisfies the testing function.
 */
export function every<T>({
  array,
  predicate, // TODO: add type for predicate
}: {
  array: T[];
  predicate: (value: T, index: number, array: T[]) => boolean;
}): {
  every: boolean;
} {
  return { every: array.every(predicate) };
}
