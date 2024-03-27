import { NodeFactoryFromDefinition } from "@breadboard-ai/build";
import { addKit } from "@google-labs/breadboard";
import { KitBuilder } from "@google-labs/breadboard/kits";
import { atNodeType } from "./at.js";
import { concatNodeType } from "./concat.js";
import { copyWithinNodeType } from "./copyWithin.js";
import { entriesNodeType } from "./entries.js";
import { fillNodeType } from "./fill.js";
import { flatNodeType } from "./flat.js";
import { includesNodeType } from "./includes.js";
import { indexOfNodeType } from "./indexOf.js";
import { isArrayNodeType } from "./isArray.js";
import { keysNodeType } from "./keys.js";
import { lastIndexOfNodeType } from "./lastIndexOf.js";
import { lengthNodeType } from "./length.js";
import { popNodeType } from "./pop.js";
import { pushNodeType } from "./push.js";
import { reverseNodeType } from "./reverse.js";
import { shiftNodeType } from "./shift.js";
import { sliceNodeType } from "./slice.js";
import { unshiftNodeType } from "./unshift.js";
import { valuesNodeType } from "./values.js";
import { withValueNodeType } from "./withValue.js";

////////////////////////////////////////////////////////////////////////////////
const ArrayKit = new KitBuilder({
  title: "Array Kit",
  description: "A collection of nodes for working with arrays.",
  url: "npm:@breadboard-ai/array-kit",
}).build({
  at: atNodeType,
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
  isArray: isArrayNodeType,
  // join: joinNodeType,
  keys: keysNodeType,
  lastIndexOf: lastIndexOfNodeType,
  length: lengthNodeType,
  // map: mapNodeType,
  pop: popNodeType,
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
  with: withValueNodeType,
});

export default ArrayKit;

export const ArrayKitNodes = addKit(ArrayKit) as {
  at: NodeFactoryFromDefinition<typeof atNodeType>;
  isArray: NodeFactoryFromDefinition<typeof isArrayNodeType>;
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
  pop: NodeFactoryFromDefinition<typeof popNodeType>;
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
  with: NodeFactoryFromDefinition<typeof withValueNodeType>;
};
