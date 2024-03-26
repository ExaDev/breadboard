import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";
/**
 * entries
 * Returns a new array iterator object that contains the key/value pairs for each index in an array.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to get the entries of.
 * @returns {IterableIterator<[number, T]>} A new array iterator object that contains the key/value pairs for each index in an array.
 */

export function entries<T>({ array }: { array: T[] }): {
  entries: IterableIterator<[number, T]>;
} {
  return { entries: array.entries() };
}

export const entriesNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    entries: {
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
    entries: {
      type: "unknown",
    },
  },
  invoke: entries,
});
