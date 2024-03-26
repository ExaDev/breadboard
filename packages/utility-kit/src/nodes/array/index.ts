import {
  NodeFactoryFromDefinition,
  anyOf,
  array,
  defineNodeType,
} from "@breadboard-ai/build";
import { MonomorphicDefinition } from "@breadboard-ai/build/internal/definition-monomorphic.js";
import { AdvancedBreadboardType } from "@breadboard-ai/build/internal/type-system/type.js";
import { Lambda, addKit, code } from "@google-labs/breadboard";
import { KitBuilder } from "@google-labs/breadboard/kits";
import { at } from "./at.js";
import { concat } from "./concat.js";
import { copyWithin } from "./copyWithin.js";
import { entries } from "./entries.js";
import { fill } from "./fill.js";
import { flat } from "./flat.js";
import { includes } from "./includes.js";
import { indexOf } from "./indexOf.js";
import { isArray } from "./isArray.js";
import { keys } from "./keys.js";
import { lastIndexOf } from "./lastIndexOf.js";
import { length } from "./length.js";
import { pop } from "./pop.js";
import { push } from "./push.js";
import { reverse } from "./reverse.js";
import { shift } from "./shift.js";
import { slice } from "./slice.js";
import { unshift } from "./unshift.js";
import { values } from "./values.js";

export const isArrayNodeType: MonomorphicDefinition<
  {
    value: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    isArray: {
      type: "boolean";
    };
  }
> = defineNodeType({
  inputs: {
    value: {
      type: array("unknown"),
    },
  },
  outputs: {
    isArray: {
      type: "boolean",
    },
  },
  invoke: isArray,
});

export const lengthNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    length: {
      type: "number";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
  },
  outputs: {
    length: {
      type: "number",
    },
  },
  invoke: length,
});

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

export const entriesNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    entries: {
      type: "unknown";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
  },
  outputs: {
    entries: {
      type: "unknown",
    },
  },
  invoke: entries,
});

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

export const includesNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    value: {
      type: "unknown";
    };
  },
  {
    includes: {
      type: "boolean";
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
  },
  outputs: {
    includes: {
      type: "boolean",
    },
  },
  invoke: includes,
});

export const indexOfNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    value: {
      type: "unknown";
    };
  },
  {
    index: {
      type: "number";
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
  },
  outputs: {
    index: {
      type: "number",
    },
  },
  invoke: indexOf,
});

export const keysNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    keys: {
      type: "unknown";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
  },
  outputs: {
    keys: {
      type: "unknown",
    },
  },
  invoke: keys,
});

export const lastIndexOfNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    value: {
      type: "unknown";
    };
  },
  {
    index: {
      type: "number";
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
  },
  outputs: {
    index: {
      type: "number",
    },
  },
  invoke: lastIndexOf,
});

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

export const pushNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    elements: {
      type: AdvancedBreadboardType<unknown | unknown[]>;
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
    elements: {
      type: anyOf("unknown", array("unknown")),
    },
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
  },
  invoke: push,
});

export const reverseNodeType: MonomorphicDefinition<
  {
    array: {
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
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
  },
  invoke: reverse,
});

export const shiftNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    first: {
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
    first: {
      type: "unknown",
    },
    array: {
      type: array("unknown"),
    },
  },
  invoke: shift,
});

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

export const unshiftNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
    elements: {
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
    elements: {
      type: array("unknown"),
    },
  },
  outputs: {
    array: {
      type: array("unknown"),
    },
  },
  invoke: unshift,
});

export const unshiftCode: Lambda<
  {
    array: unknown[];
    elements: unknown[];
  },
  {
    array: unknown[];
  }
> = code(({ array, elements }) => unshift({ array, elements }));

export const valuesNodeType: MonomorphicDefinition<
  {
    array: {
      type: AdvancedBreadboardType<unknown[]>;
    };
  },
  {
    values: {
      type: "unknown";
    };
  }
> = defineNodeType({
  inputs: {
    array: {
      type: array("unknown"),
    },
  },
  outputs: {
    values: {
      type: "unknown",
    },
  },
  invoke: values,
});

////////////////////////////////////////////////////////////////////////////////
const ArrayKit = new KitBuilder({
  title: "Example Kit",
  description: "An example kit",
  version: "0.1.0",
  url: "npm:@breadboard-ai/example-kit",
}).build({
  at: atNodeType,
  pop: popNodeType,
  isArray: isArrayNodeType,
  length: lengthNodeType,
  concat: concatNodeType,
  copyWithin: copyWithinNodeType,
  entries: entriesNodeType,
  // every: everyNodeType,
  fill: fillNodeType,
  // filter: filterNodeType,
  // find: findNodeType,
  // findIndex: findIndexNodeType,
  // findLast: findLastNodeType,
  // findLastIndex: findLastIndexNodeType,
  flat: flatNodeType,
  // flatMap: flatMapNodeType,
  // forEach: forEachNodeType,
  includes: includesNodeType,
  indexOf: indexOfNodeType,
  // join: joinNodeType,
  keys: keysNodeType,
  lastIndexOf: lastIndexOfNodeType,
  // map: mapNodeType,
  push: pushNodeType,
  // reduce: reduceNodeType,
  // reduceRight: reduceRightNodeType,
  reverse: reverseNodeType,
  shift: shiftNodeType,
  slice: sliceNodeType,
  // some: someNodeType,
  // sort: sortNodeType,
  // splice: spliceNodeType,
  // toLocaleString: toLocaleStringNodeType,
  // toString: toStringNodeType,
  unshift: unshiftNodeType,
  values: valuesNodeType,
  // with: withNodeType
});

export default ArrayKit;

export const ArrayKitNodes = addKit(ArrayKit) as {
  at: NodeFactoryFromDefinition<typeof atNodeType>;
  isArray: NodeFactoryFromDefinition<typeof isArrayNodeType>;
  pop: NodeFactoryFromDefinition<typeof popNodeType>;
  length: NodeFactoryFromDefinition<typeof lengthNodeType>;
  concat: NodeFactoryFromDefinition<typeof concatNodeType>;
  copyWithin: NodeFactoryFromDefinition<typeof copyWithinNodeType>;
  entries: NodeFactoryFromDefinition<typeof entriesNodeType>;
  // every: NodeFactoryFromDefinition<typeof everyNodeType>;
  fill: NodeFactoryFromDefinition<typeof fillNodeType>;
  // filter: NodeFactoryFromDefinition<typeof filterNodeType>;
  // find: NodeFactoryFromDefinition<typeof findNodeType>;
  // findIndex: NodeFactoryFromDefinition<typeof findIndexNodeType>;
  // findLast: NodeFactoryFromDefinition<typeof findLastNodeType>;
  // findLastIndex: NodeFactoryFromDefinition<typeof findLastIndexNodeType>;
  flat: NodeFactoryFromDefinition<typeof flatNodeType>;
  // flatMap: NodeFactoryFromDefinition<typeof flatMapNodeType>;
  // forEach: NodeFactoryFromDefinition<typeof forEachNodeType>;
  includes: NodeFactoryFromDefinition<typeof includesNodeType>;
  indexOf: NodeFactoryFromDefinition<typeof indexOfNodeType>;
  // join: NodeFactoryFromDefinition<typeof joinNodeType>;
  keys: NodeFactoryFromDefinition<typeof keysNodeType>;
  lastIndexOf: NodeFactoryFromDefinition<typeof lastIndexOfNodeType>;
  // map: NodeFactoryFromDefinition<typeof mapNodeType>;
  push: NodeFactoryFromDefinition<typeof pushNodeType>;
  // reduce: NodeFactoryFromDefinition<typeof reduceNodeType>;
  // reduceRight: NodeFactoryFromDefinition<typeof reduceRightNodeType>;
  reverse: NodeFactoryFromDefinition<typeof reverseNodeType>;
  shift: NodeFactoryFromDefinition<typeof shiftNodeType>;
  slice: NodeFactoryFromDefinition<typeof sliceNodeType>;
  // some: NodeFactoryFromDefinition<typeof someNodeType>;
  // sort: NodeFactoryFromDefinition<typeof sortNodeType>;
  // splice: NodeFactoryFromDefinition<typeof spliceNodeType>;
  // toLocaleString: NodeFactoryFromDefinition<typeof toLocaleStringNodeType>;
  // toString: NodeFactoryFromDefinition<typeof toStringNodeType>;
  unshift: NodeFactoryFromDefinition<typeof unshiftNodeType>;
  values: NodeFactoryFromDefinition<typeof valuesNodeType>;
  // with: NodeFactoryFromDefinition<typeof withNodeType>;
};
