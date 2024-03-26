import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * isArray
 * Returns `true` if the argument is an array, or `false` otherwise.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.value The value to check.
 * @returns {boolean} `true` if the argument is an array, or `false` otherwise.
 */
export function isArray<T>({ value }: { value: T[] }): {
  isArray: boolean;
} {
  return {
    isArray: Array.isArray(value),
  };
}

export const isArrayNodeType: MonomorphicDefinition<
  {
    value: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    isArray: {
      type: "boolean";
    };
  }
> = defineNodeType({
  inputs: {
    value: {
      type: array("unknown"),
    },
  },
  outputs: {
    isArray: {
      type: "boolean",
    },
  },
  invoke: isArray,
});
