import {
    InputValues,
    Node,
    OutputValues
} from "@google-labs/breadboard";


export function isNode(obj: any): obj is Node<InputValues, OutputValues> {
  return (
    obj &&
    typeof obj == "object" &&
    "id" in obj &&
    "type" in obj &&
    "configuration" in obj
  );
}
