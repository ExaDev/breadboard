import { Lambda, code } from "@google-labs/breadboard";

export const gather: Lambda<
  {
    [key: string]: unknown;
  },
  {
    object: object;
  }
> = code((inputs) => {
  return { object: inputs };
});
