import { Lambda, code } from "@google-labs/breadboard";

export const spread: Lambda<
  {
    object: object;
  },
  {
    [key: string]: unknown;
  }
> = code((inputs) => {
  const object = inputs.object;
  if (typeof object !== "object") {
    throw new Error(`object is of type ${typeof object} not object`);
  }
  return { ...object };
});
