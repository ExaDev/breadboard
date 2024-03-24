import { Lambda, code } from "@google-labs/breadboard";

export const fill: Lambda<
  {
    array: unknown[];
    value: unknown;
    start?: number;
    end?: number;
  },
  {
    array: unknown[];
  }
> = code(({ array, value, start = 0, end = array.length }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { array: array.fill(value, start, end) };
});
