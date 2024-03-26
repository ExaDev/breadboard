import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * indexOf
 * Returns the first (least) index at which a given element can be found in the calling array.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to search.
 * @param {T} inputs.value The value to locate in the array.
 * @returns {number} The first index at which a given element can be found in the calling array.
 */
export const indexOf = <T>({
  array,
  value,
}: {
  array: T[];
  value: T;
}): {
  index: number;
} => ({ index: array.indexOf(value) });

export const indexOfNodeType: MonomorphicDefinition<
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
  invoke: indexOf,
});
