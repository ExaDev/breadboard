/**
 * some
 * Returns `true` if at least one element in the calling array satisfies the provided testing function.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to check.
 * @param {Function} inputs.callback The function to test for each element.
 * @returns {boolean} `true` if at least one element in the calling array satisfies the provided testing function.
 */
export function some<T>({
  array,
  callback: predicate, // TODO: add type for callback
}: {
  array: T[];
  callback: (value: T, index: number, array: T[]) => boolean;
}): {
  some: boolean;
} {
  return { some: array.some(predicate) };
}
