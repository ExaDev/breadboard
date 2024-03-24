import { Lambda, code } from "@google-labs/breadboard";

export const copyWithin: Lambda<
  {
    array: unknown[];
    target: number;
    start?: number;
    end?: number;
  },
  {
    array: unknown[];
  }
> = code(({ array, target, start = 0, end = array.length }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { array: array.copyWithin(target, start, end) };
});
