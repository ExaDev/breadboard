import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * flat
 * Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to flatten.
 * @param {Number} [inputs.depth=1] The depth level specifying how deep a nested array structure should be flattened.
 * @returns {Array<T>} A new array with all sub-array elements concatenated into it recursively up to the specified depth.
 */
export function flat<T>({ array, depth = 1 }: { array: T[]; depth?: number }): {
  array: FlatArray<
    T,
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
  >[];
} {
  return { array: array.flat(depth) };
}

export const flatNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    depth: {
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
    depth: {
      type: "number",
    },
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
  },
  invoke: flat,
});
