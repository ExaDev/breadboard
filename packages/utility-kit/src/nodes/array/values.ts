import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * values
 * Returns a new array iterator object that contains the values for each index in the array.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to get the values from.
 * @returns {IterableIterator<T>} A new array iterator object that contains the values for each index in the array.
 */
export function values<T>({ array }: { array: T[] }): {
  values: IterableIterator<T>;
} {
  return { values: array.values() };
}

export const valuesNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    values: {
      type: "unknown";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
  },
  outputs: {
    values: {
      type: "unknown",
    },
  },
  invoke: values,
});
