import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";
/**
 * reverse
 * Reverses the order of the elements of an array _in place_. (First becomes the last, last becomes first.)
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to reverse.
 * @returns {Array<T>} The reversed array.
 */
export function reverse<T>({ array }: { array: T[] }): {
  array: T[];
} {
  return { array: array.reverse() };
}

export const reverseNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
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
    array: {
      type: array("unknown"),
    },
  },
  invoke: reverse,
});
