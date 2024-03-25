import { array, defineNodeType } from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";

export function at<T>(inputs: { array: T[]; index: number }): {
  value: T | undefined;
} {
  const { array, index } = inputs;
  return { value: array.at(index) };
}

export const atNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    index: {
      type: "number";
    };
  },
  {
    value: {
      type: "unknown";
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
  },
  outputs: {
    value: {
      type: "unknown",
    },
  },
  invoke: at,
});
