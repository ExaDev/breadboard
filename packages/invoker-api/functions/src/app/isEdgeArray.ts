import { Edge } from "@google-labs/breadboard";
import { isEdge } from "./isEdge.js";


export function isEdgeArray(obj: any): obj is Edge[] {
  return typeof obj == "object" && Array.isArray(obj) && obj.every(isEdge);
}
