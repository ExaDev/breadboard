import { InputValues, Node, OutputValues } from "@google-labs/breadboard";
import { isNode } from "./isNode.js";

export function isNodeArray(
  obj: any
): obj is Node<InputValues, OutputValues>[] {
  // return typeof obj == "object" && Array.isArray(obj) && obj.every(isNode);
  if (typeof obj !== "object") {
    console.error("nodes array is not an object", obj);
    return false;
  }
  if (obj === null) {
    console.error("nodes array is null", obj);
    return false;
  }
  if (!Array.isArray(obj)) {
    console.error("nodes arary is not an array", obj);
    return false;
  }
  if (!obj.every(isNode)) {
    console.error("nodes arary is not an array of nodes", obj);
    return false;
  }
  return true;
}
