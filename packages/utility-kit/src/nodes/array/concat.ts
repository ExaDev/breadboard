import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

export function concat<T>({
  prepend = [],
  array,
  append = [],
}: {
  array: T[];
  prepend?: T[];
  append?: T[];
}): {
  array: unknown[];
} {
  return {
    array: [...prepend, ...array, ...append],
  };
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
