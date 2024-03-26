import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * slice
 * Extracts a section of the calling array and returns a new array.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to extract from.
 * @param {number} [inputs.start=0] The index at which to begin extraction.
 * @param {number} [inputs.end=array.length] The index at which to end extraction.
 * @returns {Array<T>} A new array containing the extracted elements.
 */
export function slice<T>({
  array,
  start = 0,
  end = array.length,
}: {
  array: T[];
  start?: number;
  end?: number;
}): {
  array: T[];
} {
  return { array: array.slice(start, end) };
}

export const sliceNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    start: {
      type: "number";
    };
    end: {
      type: "number";
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
    start: {
      type: "number",
    },
    end: {
      type: "number",
    },
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
  },
  invoke: slice,
});
