import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

/**
 * fill
 * Fills all the elements of an array from a start index to an end index with a static value.
 * @template T The type of the array items.
 * @param {Object} inputs
 * @param {Array<T>} inputs.array The array to fill.
 * @param {T} inputs.value The value to fill the array with.
 * @param {Number} [inputs.start=0] The index to start filling the array at.
 * @param {Number} [inputs.end=array.length] The index to stop filling the array at.
 * @returns {Array<T>} The filled array.
 */
export function fill<T>({
  array,
  value,
  start = 0,
  end = array.length,
}: {
  array: T[];
  value: T;
  start?: number;
  end?: number;
}): {
  array: T[];
} {
  return { array: array.fill(value, start, end) };
}

export const fillNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    value: {
      type: "unknown";
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
    value: {
      type: "unknown",
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
  invoke: fill,
});
