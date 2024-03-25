import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

export function pop<T>(inputs: {
  array: T[];
}): { last: T | undefined; array: T[] } {
  const { array } = inputs;
  const last = array.pop();
  return {
    last,
    array,
  };
}

export const popNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    last: {
      type: "unknown";
    };
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
  },
  outputs: {
    last: {
      type: "unknown",
    },
    array: {
      type: array("unknown"),
    },
  },
  invoke: pop,
});