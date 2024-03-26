import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * pop
 * Removes the last element from an array and returns that element.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to modify.
 * @returns {Object} An object containing the last element and the modified array.
 */
export const pop = <T>({
  array,
}: {
  array: T[];
}): {
  last: T | undefined;
  array: T[];
} => {
  const last = array.pop();
  return {
    last,
    array,
  };
};

export const popNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    last: {
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
    last: {
      type: "unknown",
    },
    array: {
      type: array("unknown"),
    },
  },
  invoke: pop,
});
