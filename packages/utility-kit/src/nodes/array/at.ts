import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * at
 * Returns the array item at the given index. Accepts negative integers, which count back from the last item.
 * @template T - The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array - The array to get the item from.
 * @param {Number} inputs.index - The index of the item to get.
 * @returns {T | undefined} The item at the given index, or `undefined` if the index is out of bounds.
 */
export function at<T>({ array, index }: { array: T[]; index: number }): {
  value: T | undefined;
} {
  return { value: array.at(index) };
}

export const atNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    index: {
      type: "number";
    };
  },
  {
    value: {
      type: "unknown";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
    index: {
      type: "number",
    },
  },
  outputs: {
    value: {
      type: "unknown",
    },
  },
  invoke: at,
});
