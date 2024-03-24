import { Lambda, code } from "@google-labs/breadboard";

export const concat: Lambda<
  {
    arrayOne: unknown[];
    arrayTwo: unknown[];
  },
  {
    array: unknown[];
  }
> = code((inputs) => {
  const { arrayOne, arrayTwo } = inputs;
  if (!Array.isArray(arrayOne) || !Array.isArray(arrayTwo)) {
    throw new Error(
      `arrayOne or arrayTwo is of type ${typeof arrayOne} or ${typeof arrayTwo} not array`
    );
  }
  return { array: arrayOne.concat(arrayTwo) };
});
