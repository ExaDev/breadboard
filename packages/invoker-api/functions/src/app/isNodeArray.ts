import {
    InputValues,
    Node,
    OutputValues
} from "@google-labs/breadboard";
import { isNode } from "./isNode.js";


export function isNodeArray(
  obj: any
): obj is Node<InputValues, OutputValues>[] {
  return typeof obj == "object" && Array.isArray(obj) && obj.every(isNode);
}
