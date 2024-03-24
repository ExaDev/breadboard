import { Lambda, code } from "@google-labs/breadboard";

export const toString: Lambda<
  {
    array: unknown[];
  },
  {
    string: string;
  }
> = code(({ array }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { string: array.toString() };
});
