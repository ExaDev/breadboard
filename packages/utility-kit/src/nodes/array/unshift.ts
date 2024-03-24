import { Lambda, code } from "@google-labs/breadboard";

export const unshift: Lambda<
  {
    array: unknown[];
    elements: unknown[];
  },
  {
    array: unknown[];
  }
> = code(({ array, elements }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  array.unshift(...elements);
  return { array };
});
