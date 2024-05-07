import { Edge } from "@google-labs/breadboard";
import { isEdge } from "./isEdge.js";

export function isEdgeArray(obj: any): obj is Edge[] {
  // return typeof obj == "object" && Array.isArray(obj) && obj.every(isEdge);
  if (typeof obj !== "object") {
    console.error("edge arary is not an object", obj);
    return false;
  }
  if (obj === null) {
    console.error("edge arary is null", obj);
    return false;
  }
  if (!Array.isArray(obj)) {
    console.error("edge arary is not an array", obj);
    return false;
  }
  if (!obj.every(isEdge)) {
    console.error("edge arary is not an array of edges", obj);
    return false;
  }
  return true;
}
