import { Lambda, code } from "@google-labs/breadboard";

export const reverse: Lambda<
  { array: unknown[] },
  {
    array: unknown[];
  }
> = code(({ array }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { array: array.reverse() };
});
