import { Lambda, code } from "@google-labs/breadboard";

export const pop: Lambda<
  {
    array: unknown[];
  },
  {
    value: unknown;
    array: unknown[];
  }
> = code((inputs) => {
  const array = inputs.array;
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  const value = array.pop();
  return { value, array };
});
