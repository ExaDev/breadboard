import { defineNodeType } from "@breadboard-ai/build";

/**
 * isArray
 * Returns `true` if the argument is an array, or `false` otherwise.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.value The value to check.
 * @returns {boolean} `true` if the argument is an array, or `false` otherwise.
 */
export function isArray({ value }: { value: unknown }): {
  isArray: boolean;
} {
  return {
    isArray: Array.isArray(value),
  };
}

export const isArrayNodeType = defineNodeType({
  inputs: {
    value: {
      type: "unknown",
    },
  },
  outputs: {
    isArray: {
      type: "boolean",
    },
  },
  invoke: isArray,
});
