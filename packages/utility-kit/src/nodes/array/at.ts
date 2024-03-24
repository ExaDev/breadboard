import { code } from "@google-labs/breadboard";

export const at = code(({ array, index }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  if (typeof index !== "number") {
    throw new Error(`index is of type ${typeof index} not number`);
  }
  return { value: array[index] };
});
