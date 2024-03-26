import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * copyWithin
 * Copies a sequence of array elements within an array.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to copy elements within.
 * @param {Number} inputs.target The index at which to copy the sequence to.
 * @param {Number} [inputs.start=0] The index at which to start copying elements from.
 * @param {Number} [inputs.end=array.length] The index at which to stop copying elements from.
 * @returns {Array<T>} The array with the copied elements.
 */

export function copyWithin<T>({
  array,
  target,
  start = 0,
  end = array.length,
}: {
  array: T[];
  target: number;
  start?: number;
  end?: number;
}): {
  array: T[];
} {
  return { array: array.copyWithin(target, start, end) };
}

export const copyWithinNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    target: {
      type: "number";
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
    target: {
      type: "number",
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
  invoke: copyWithin,
});
