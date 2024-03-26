import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * join
 * Joins all elements of an array into a string.
 * @template T - The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array - The array to join.
 * @param {String} [inputs.separator=','] - The string to separate each element of the array.
 * @returns The string of all elements joined together.
 */
export function join<T>({
  array,
  separator = ",",
}: {
  array: T[];
  separator?: string;
}): {
  string: string;
} {
  return { string: array.join(separator) };
}

export const joinNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    separator: {
      type: "string";
    };
  },
  {
    string: {
      type: "string";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
    separator: {
      type: "string",
    },
  },
  outputs: {
    string: {
      type: "string",
    },
  },
  invoke: join,
});
