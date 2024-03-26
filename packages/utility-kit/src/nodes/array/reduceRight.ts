/**
 * reduceRight
 * Executes a user-supplied "reducer" callback function on each element of the array (from right to left), to reduce it to a single value.
 * @template T The type of the array items.
 * @template U The type of the reduced value.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to reduce.
 * @param {Function} inputs.callbackFn The function to execute on each element.
 * @param {U} inputs.initialValue The initial value of the accumulator.
 * @returns {U} The reduced value.
 */
export function reduceRight<T, U>({
  array,
  callbackFn, // TODO: add type for callback
  initialValue,
}: {
  array: T[];
  callbackFn: (accumulator: U, value: T, index: number, array: T[]) => U;
  initialValue: U;
}): {
  value: U;
} {
  return { value: array.reduceRight(callbackFn, initialValue) };
}
