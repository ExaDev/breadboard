import { Lambda, code } from "@google-labs/breadboard";

export const flat: Lambda<
  {
    array: unknown[];
    depth?: number;
  },
  {
    array: unknown[];
  }
> = code(({ array, depth = 1 }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { array: array.flat(depth) };
});
