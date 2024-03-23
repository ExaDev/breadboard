import { Lambda, code } from "@google-labs/breadboard";

export const keys: Lambda<
  {
    object: object;
  },
  {
    keys: string[];
  }
> = code((inputs) => {
  const object = inputs.object;
  if (typeof object !== "object") {
    throw new Error(`object is of type ${typeof object} not object`);
  }
  return { keys: Object.keys(object) };
});
