import { NodeValue, code } from "@google-labs/breadboard";

const shift = code<{ items: unknown; }, { item?: NodeValue; items: NodeValue[]; }>(
  (inputs) => {
    if (!Array.isArray(inputs.items)) {
      throw new Error("items is not an array");
    }
    const items = inputs.items;
    return {
      item: items.shift(),
      items,
    };
  }
);

type shift = typeof shift;
export { shift };

