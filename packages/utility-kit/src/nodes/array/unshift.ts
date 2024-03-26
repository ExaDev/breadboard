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
export function unshift<T>({ array, value }: { array: T[]; value: T[] | T }): {
  array: T[];
  length: number;
} {
  value = Array.isArray(value) ? value : [value];
  const length = array.unshift(...value);
  return { array, length };
}

export const unshiftNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    value: {
      type: AdvancedBreadboardType<unknown[]>;
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
      type: array("unknown"),
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
  invoke: unshift,
});
export const unshiftCode: Lambda<
  {
    array: unknown[];
    value: unknown[];
  },
  {
    array: unknown[];
    length: number;
  }
> = code(({ array, value }) => unshift({ array, value }));
