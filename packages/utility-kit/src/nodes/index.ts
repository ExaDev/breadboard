import { addKit } from "@google-labs/breadboard";
import { KitBuilder } from "@google-labs/breadboard/kits";

export * as arrayNodes from "./array/index.js";
export * as objectNodes from "./object/index.js";

const UtilityKit = new KitBuilder({
  url: "npm:@breadboard-ai/utility-kit",
}).build({
  
});

export const UtilityKitNodes = addKit(UtilityKit);
