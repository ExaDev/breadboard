import { array } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * with
 * Returns a new array with the element at the given index replaced with the given value, without modifying the original array.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to modify.
 * @param {number} inputs.index The index of the element to replace.
 * @param {T} inputs.value The value to replace the element with.
 * @returns {Array<T>} A new array with the element at the given index replaced with the given value.
 */
export function withValue<T>({
  array,
  index,
  value,
}: {
  array: T[];
  index: number;
  value: T;
}): {
  array: T[];
} {
  const newArray = array.slice();
  newArray[index] = value;
  return { array: newArray };
}

export const withValueNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    index: {
      type: AdvancedBreadboardType<number>;
    };
    value: {
      type: AdvancedBreadboardType<unknown>;
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
    index: {
      type: "number",
    },
    value: {
      type: "unknown",
    },
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
  },
  invoke: withValue,
});
