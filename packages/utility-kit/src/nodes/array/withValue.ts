import { array, defineNodeType } from "@breadboard-ai/build";

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

export const withValueNodeType = defineNodeType({
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
