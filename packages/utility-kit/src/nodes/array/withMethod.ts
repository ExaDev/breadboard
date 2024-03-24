import { Lambda, code } from "@google-labs/breadboard";

export const withMethod: Lambda<
  {
    array: unknown[];
    index: number;
    value: unknown;
  },
  {
    array: unknown[];
  }
> = code(({ array, index, value }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  array[index] = value;
  return { array };
});
