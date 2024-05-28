import { NodeValue, code } from "@google-labs/breadboard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pop = code<{ items: unknown }, { item?: NodeValue; items: NodeValue[] }>(
  (inputs) => {
    if (!Array.isArray(inputs.items)) {
      throw new Error("items is not an array");
    }
    const items = inputs.items;
    return {
      item: items.pop(),
      items,
    };
  }
);
type pop = typeof pop;

export { pop };


