import { GraphDescriptor } from "@google-labs/breadboard";
import { isEdgeArray } from "./isEdgeArray.js";
import { isNodeArray } from "./isNodeArray.js";


export function isBGL(json: unknown): json is GraphDescriptor {
  if (typeof json !== "object") {
    return false;
  }
  if (json === null) {
    return false;
  }
  if (Array.isArray(json)) {
    return false;
  }
  if (!("nodes" in json)) {
    return false;
  }
  if (!isNodeArray(json.nodes)) {
    return false;
  }
  if (!("edges" in json)) {
    return false;
  }
  if (!isEdgeArray(json.edges)) {
    return false;
  }
  return true;
}
