import { InputValues, Lambda, code } from "@google-labs/breadboard";

export const concat: Lambda<
  {
    arrayKeys?: string[];
  } & InputValues,
  {
    array: unknown[];
  }
> = code(
  (
    inputs: { arrayKeys?: string[]; [key: string]: unknown } = {
      arrayKeys: ["arrayOne", "arrayTwo"],
    }
  ) => {
    let arrayKeys = inputs.arrayKeys;

    if (!Array.isArray(arrayKeys) || arrayKeys.length === 0) {
      arrayKeys = Object.keys(inputs).filter((key) =>
        Array.isArray(inputs[key])
      );
    }

    const arrays = arrayKeys.map((key) => inputs[key]);
    return { array: arrays.flat() };
  }
);
