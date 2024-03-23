import { Lambda, code } from "@google-labs/breadboard";

export const entries: Lambda<
  {
    object: { [key: string]: unknown };
  },
  {
    entries: [string, unknown][];
  }
> = code((inputs) => {
  const object = inputs.object;
  if (typeof object !== "object") {
    throw new Error(`object is of type ${typeof object} not object`);
  }
  return { entries: Object.entries(object) };
});
