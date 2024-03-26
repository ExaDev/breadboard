// - [`Array.prototype.fill()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
//   - Fills all the elements of an array from a start index to an end index with a static value.
/**
 * fill
 * Fills all the elements of an array from a start index to an end index with a static value.
 * @param array - The array to fill.
 * @param value - The value to fill the array with.
 * @param start - The index at which to start filling the array.
 * @param end - The index at which to stop filling the array.
 * @returns array - The filled array.
 */

export function fill<T>({
  array,
  value,
  start = 0,
  end = array.length,
}: {
  array: T[];
  value: T;
  start?: number;
  end?: number;
}): {
  array: T[];
} {
  return { array: array.fill(value, start, end) };
}
