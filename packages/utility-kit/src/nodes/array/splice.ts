import { Lambda, code } from "@google-labs/breadboard";

export const splice: Lambda<
  {
    array: unknown[];
    start: number;
    deleteCount?: number;
    elements?: unknown[];
  },
  {
    array: unknown[];
  }
> = code(({ array, start, deleteCount = 0, elements = [] }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { array: array.splice(start, deleteCount, ...elements) };
});
