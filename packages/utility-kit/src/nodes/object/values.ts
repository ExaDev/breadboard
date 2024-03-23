import { Lambda, code } from "@google-labs/breadboard";

export const values: Lambda<
  {
    object: object;
  },
  {
    values: unknown[];
  }
> = code((inputs) => {
  const object = inputs.object;
  if (typeof object !== "object") {
    throw new Error(`object is of type ${typeof object} not object`);
  }
  return { values: Object.values(object) };
});
