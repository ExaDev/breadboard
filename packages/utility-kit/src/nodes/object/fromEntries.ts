import { Lambda, code } from "@google-labs/breadboard";

export const fromEntries: Lambda<
  {
    entries: [string, unknown][];
  },
  { [key: string]: unknown }
> = code((inputs) => {
  const entries = inputs.entries;
  if (!Array.isArray(entries)) {
    throw new Error(`entries is of type ${typeof entries} not array`);
  }
  return Object.fromEntries(entries);
});
