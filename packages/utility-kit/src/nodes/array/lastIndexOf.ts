import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * lastIndexOf
 * Returns the last (greatest) index at which a given element can be found in the calling array, or `-1` if none is found.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to search.
 * @param {T} inputs.value The value to locate in the array.
 * @returns {number} The last index of the element in the array, or `-1` if not found.
 */
export function lastIndexOf<T>({ array, value }: { array: T[]; value: T }): {
  index: number;
} {
  return { index: array.lastIndexOf(value) };
}

export const lastIndexOfNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    value: {
      type: "unknown";
    };
  },
  {
    index: {
      type: "number";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
    value: {
      type: "unknown",
    },
  },
  outputs: {
    index: {
      type: "number",
    },
  },
  invoke: lastIndexOf,
});
