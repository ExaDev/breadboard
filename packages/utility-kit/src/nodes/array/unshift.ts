import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";
import { Lambda, code } from "@google-labs/breadboard";

/**
 * unshift
 * Adds one or more elements to the front of an array, and returns the new `length` of the array.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to modify.
 * @param {Array<T>} inputs.elements The elements to add to the front of the array.
 * @returns {Array<T>} The modified array.
 */
export function unshift<T>({
  array,
  elements,
}: {
  array: T[];
  elements: T[];
}): {
  array: T[];
} {
  array.unshift(...elements);
  return { array };
}

export const unshiftNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    elements: {
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
    elements: {
      type: array("unknown"),
    },
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
  },
  invoke: unshift,
});
export const unshiftCode: Lambda<
  {
    array: unknown[];
    elements: unknown[];
  },
  {
    array: unknown[];
  }
> = code(({ array, elements }) => unshift({ array, elements }));
