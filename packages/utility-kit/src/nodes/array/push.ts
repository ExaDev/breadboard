import { anyOf, array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * push
 * Adds one or more value to the end of an array, and returns the new `length` of the array.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to modify.
 * @param {T | Array<T>} inputs.value The element(s) to add to the array.
 * @returns {Array<T>} The modified array.
 */
export function push<T>({ array, value }: { array: T[]; value: T | T[] }): {
  array: T[];
  length: number;
} {
  const length = array.push(...(Array.isArray(value) ? value : [value]));
  return { array, length };
}

export const pushNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    value: {
      type: AdvancedBreadboardType<unknown | unknown[]>;
    };
  },
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    length: {
      type: "number";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
    value: {
      type: anyOf("unknown", array("unknown")),
    },
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
    length: {
      type: "number",
    },
  },
  invoke: push,
});
