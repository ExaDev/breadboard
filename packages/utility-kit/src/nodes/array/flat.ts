// - [`Array.prototype.flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
//   - Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
/**
 * flat
 * Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
 * @param array - The array to flatten.
 * @param depth - The depth to flatten the array.
 * @returns array - The flattened array.
 */

export function flat<T>({ array, depth = 1 }: { array: T[]; depth?: number }): {
  array: FlatArray<
    T,
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
  >[];
} {
  return { array: array.flat(depth) };
}
