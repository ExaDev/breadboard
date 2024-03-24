import { Lambda, code } from "@google-labs/breadboard";

export const entries: Lambda<
  {
    array: unknown[];
  },
  {
    entries: IterableIterator<[number, unknown]>;
  }
> = code((inputs) => {
  const array = inputs.array;
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { entries: array.entries() };
});
