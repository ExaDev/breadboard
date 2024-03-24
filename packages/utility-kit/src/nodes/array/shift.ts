import { Lambda, code } from "@google-labs/breadboard";

export const shift: Lambda<
  {
    array: unknown[];
  },
  {
    value: unknown;
    array: unknown[];
  }
> = code(({ array }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  const value = array.shift();
  return { value, array };
});
