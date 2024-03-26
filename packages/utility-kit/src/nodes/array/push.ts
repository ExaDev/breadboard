import { anyOf, array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * push
 * Adds one or more elements to the end of an array, and returns the new `length` of the array.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to modify.
 * @param {T | Array<T>} inputs.elements The element(s) to add to the array.
 * @returns {Array<T>} The modified array.
 */
export function push<T>({
  array,
  elements,
}: {
  array: T[];
  elements: T | T[];
}): {
  array: T[];
} {
  return { array: array.concat(elements) };
}

export const pushNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    elements: {
      type: AdvancedBreadboardType<unknown | unknown[]>;
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
    elements: {
      type: anyOf("unknown", array("unknown")),
    },
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
  },
  invoke: push,
});
