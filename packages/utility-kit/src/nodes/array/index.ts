export * from "./at.js";
export * from "./concat.js";
export * from "./copyWithin.js";
export * from "./entries.js";
export * from "./fill.js";
export * from "./flat.js";
export * from "./pop.js";
export * from "./push.js";
export * from "./reverse.js";
export * from "./shift.js";
export * from "./slice.js";
export * from "./splice.js";
export * from "./toString.js";
export * from "./unshift.js";
export * from "./withMethod.js";

import { NodeFactoryFromDefinition } from "@breadboard-ai/build";
import { addKit } from "@google-labs/breadboard";
import { KitBuilder } from "@google-labs/breadboard/kits";
import { popNodeType } from "./pop.js";

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
