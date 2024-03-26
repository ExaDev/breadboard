/**
 * forEach
 * Calls a function for each element in the calling array.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to iterate over.
 * @param {Function} inputs.callbackFn The function to call for each element.
 * @returns {void}
 */
export function forEach<T>({
  array,
  callbackFn, // TODO: add type for callbackFn
}: {
  array: T[];
  callbackFn: (value: T, index: number, array: T[]) => void;
}): void {
  array.forEach(callbackFn);
}
