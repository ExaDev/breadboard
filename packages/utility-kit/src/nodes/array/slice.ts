import { Lambda, code } from "@google-labs/breadboard";

export const slice: Lambda<
  {
    array: unknown[];
    start?: number;
    end?: number;
  },
  {
    array: unknown[];
  }
> = code(({ array, start = 0, end = array.length }) => {
  // const { array, start, end } = inputs;
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { array: array.slice(start, end) };
});
