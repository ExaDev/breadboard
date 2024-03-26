/**
 * splice
 * Adds and/or removes elements from an array.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to splice.
 * @param {Number} inputs.start The index at which to start changing the array.
 * @param {Number} [inputs.deleteCount=0] The number of elements to remove.
 * @param {Array<T>} [inputs.elements=[]] The elements to add to the array.
 * @returns {Array<T>} The array with the elements added and/or removed.
 */
export function splice<T>({
  array,
  start,
  deleteCount = 0,
  elements = [],
}: {
  array: T[];
  start: number;
  deleteCount?: number;
  elements?: T[];
}): {
  array: T[];
} {
  return { array: array.splice(start, deleteCount, ...elements) };
}
