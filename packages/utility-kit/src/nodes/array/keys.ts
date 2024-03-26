import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * keys
 * Returns a new array iterator that contains the keys for each index in the calling array.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to get the keys from.
 * @returns {IterableIterator<number>} A new array iterator that contains the keys for each index in the calling array.
 */
export const keys = <T>({
  array,
}: {
  array: T[];
}): {
  keys: IterableIterator<number>;
} => ({ keys: array.keys() });

export const keysNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    keys: {
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
    keys: {
      type: "unknown",
    },
  },
  invoke: keys,
});
