import {
  array,
  defineNodeType,
  NodeFactoryFromDefinition,
} from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";
import { addKit, code, Lambda } from "@google-labs/breadboard";
import { KitBuilder } from "@google-labs/breadboard/kits";

export function pop<T>(inputs: { array: T[] }): {
  last: T | undefined;
  array: T[];
} {
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
const ArrayKit = new KitBuilder({
  title: "Example Kit",
  description: "An example kit",
  version: "0.1.0",
  url: "npm:@breadboard-ai/example-kit",
}).build({
  pop: popNodeType,
});

export default ArrayKit;

export const ArrayKitNodes = addKit(ArrayKit) as {
  pop: NodeFactoryFromDefinition<typeof popNodeType>;
};

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
export const copyWithin: Lambda<
  {
    array: unknown[];
    target: number;
    start?: number;
    end?: number;
  },
  {
    array: unknown[];
  }
> = code(({ array, target, start = 0, end = array.length }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { array: array.copyWithin(target, start, end) };
});
export const arrayToEntries: Lambda<
  {
    array: unknown[];
  },
  {
    entries: IterableIterator<[number, unknown]>;
  }
> = code((inputs) => {
  const array = inputs.array;
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { entries: array.entries() };
});
export const fill: Lambda<
  {
    array: unknown[];
    value: unknown;
    start?: number;
    end?: number;
  },
  {
    array: unknown[];
  }
> = code(({ array, value, start = 0, end = array.length }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { array: array.fill(value, start, end) };
});
export const flat: Lambda<
  {
    array: unknown[];
    depth?: number;
  },
  {
    array: unknown[];
  }
> = code(({ array, depth = 1 }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { array: array.flat(depth) };
});
export const push: Lambda<
  {
    array: unknown[];
    elements: unknown[] | unknown;
  },
  {
    array: unknown[];
  }
> = code(({ array, elements }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { array: array.concat(elements) };
});
export const reverse: Lambda<
  { array: unknown[] },
  {
    array: unknown[];
  }
> = code(({ array }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { array: array.reverse() };
});
export const shift: Lambda<
  {
    array: unknown[];
  },
  {
    value: unknown;
    array: unknown[];
  }
> = code(({ array }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  const value = array.shift();
  return { value, array };
});
export const slice: Lambda<
  {
    array: unknown[];
    start?: number;
    end?: number;
  },
  {
    array: unknown[];
  }
> = code(({ array, start = 0, end = array.length }) => {
  // const { array, start, end } = inputs;
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { array: array.slice(start, end) };
});
export const splice: Lambda<
  {
    array: unknown[];
    start: number;
    deleteCount?: number;
    elements?: unknown[];
  },
  {
    array: unknown[];
  }
> = code(({ array, start, deleteCount = 0, elements = [] }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { array: array.splice(start, deleteCount, ...elements) };
});
export const toString: Lambda<
  {
    array: unknown[];
  },
  {
    string: string;
  }
> = code(({ array }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  return { string: array.toString() };
});
export const unshift: Lambda<
  {
    array: unknown[];
    elements: unknown[];
  },
  {
    array: unknown[];
  }
> = code(({ array, elements }) => {
  if (!Array.isArray(array)) {
    throw new Error(`array is of type ${typeof array} not array`);
  }
  array.unshift(...elements);
  return { array };
});
