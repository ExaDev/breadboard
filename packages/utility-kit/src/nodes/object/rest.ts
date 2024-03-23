import { Lambda, code } from "@google-labs/breadboard";

export const rest: Lambda<
  {
    key: string;
    object: Record<string, unknown>;
    outputKey?: string;
  },
  {
    [key: string]: unknown;
    rest: Record<string, unknown>;
  }
> = code((inputs) => {
  const { key, object, outputKey = key } = inputs;
  const { [key]: value, ...rest } = object;
  return { [outputKey]: value, rest };
});
