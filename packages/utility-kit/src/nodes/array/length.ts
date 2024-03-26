import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * length - Reflects the number of elements in an array.
 * @template T - The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array - The array to get the length of.
 * @returns The number of elements in the array.
 */
export function length<T>(inputs: { array: T[] }): {
  length: number;
} {
  const { array } = inputs;
  return {
    length: array.length,
  };
}

export const lengthNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    length: {
      type: "number";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
  },
  outputs: {
    length: {
      type: "number",
    },
  },
  invoke: length,
});
