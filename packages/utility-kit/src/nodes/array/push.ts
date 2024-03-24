import { Lambda, code } from "@google-labs/breadboard";

export const push: Lambda<
  {
    array: unknown[];
    elements: unknown[] | unknown;
  },
  {
    array: unknown[];
  }
> = code(({ array, elements }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { array: array.concat(elements) };
});
