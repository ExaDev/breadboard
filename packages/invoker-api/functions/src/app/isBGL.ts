import { GraphDescriptor } from "@google-labs/breadboard";
import { isEdgeArray } from "./isEdgeArray.js";
import { isNodeArray } from "./isNodeArray.js";


export function isBGL(json: unknown): json is GraphDescriptor {
  if (typeof json !== "object") {
    console.error("json is not an object");
    return false;
  }
  if (json === null) {
    console.error("json is null");
    return false;
  }
  if (Array.isArray(json)) {
    console.error("json is an array");
    return false;
  }
  if (!("nodes" in json)) {
    console.error("json does not have a nodes key");
    return false;
  }
  if (!isNodeArray(json.nodes)) {
    console.error("json.nodes is not an array of nodes");
    return false;
  }
  if (!("edges" in json)) {
    console.error("json does not have an edges key");
    return false;
  }
  if (!isEdgeArray(json.edges)) {
    console.error("json.edges is not an array of edges");
    return false;
  }
  return true;
}
