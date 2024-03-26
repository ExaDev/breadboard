import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * includes
 * Determines whether the calling array contains a value, returning `true` or `false` as appropriate.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to search.
 * @param {T} inputs.value The value to search for.
 * @returns {boolean} `true` if the array contains the value, or `false` otherwise.
 */
export const includes = <T>({
  array,
  value,
}: {
  array: T[];
  value: T;
}): {
  includes: boolean;
} => ({ includes: array.includes(value) });

export const includesNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    value: {
      type: "unknown";
    };
  },
  {
    includes: {
      type: "boolean";
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
    includes: {
      type: "boolean",
    },
  },
  invoke: includes,
});
