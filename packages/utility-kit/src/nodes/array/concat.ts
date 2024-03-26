import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * concat
 * Returns a new array that is the calling array joined with other array(s) and/or value(s).
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to concatenate.
 * @param {Array<T>} [inputs.prepend] The array to prepend to the calling array.
 * @param {Array<T>} [inputs.append] The array to append to the calling array.
 * @returns {Array<T>} A new array that is the calling array joined with other array(s) and/or value(s).
 */
export function concat<T>({
  array,
  prepend = [],
  append = [],
}: {
  array: T[];
  prepend?: T[];
  append?: T[];
}): {
  array: T[];
} {
  return { array: [...prepend, ...array, ...append] };
}

export const concatNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    prepend: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    append: {
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
    prepend: {
      type: array("unknown"),
    },
    append: {
      type: array("unknown"),
    },
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
  },
  invoke: concat,
});
