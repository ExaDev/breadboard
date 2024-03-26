import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * shift
 * Removes the first element from an array and returns that element.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to modify.
 * @returns {Object} An object containing the first element of the array and the modified array.
 */
export function shift<T>(inputs: { array: T[] }): {
  first: T | undefined;
  array: T[];
} {
  const { array } = inputs;
  const first = array.shift();
  return {
    first,
    array,
  };
}

export const shiftNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    first: {
      type: "unknown";
    };
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
  },
  outputs: {
    first: {
      type: "unknown",
    },
    array: {
      type: array("unknown"),
    },
  },
  invoke: shift,
});
