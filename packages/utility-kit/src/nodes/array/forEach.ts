// - [`Array.prototype.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
//   - Calls a function for each element in the calling array.
/**
 * forEach
 * Calls a function for each element in the calling array.
 * @param array - The array to iterate over.
 * @param callback - A function to call for each element.
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
