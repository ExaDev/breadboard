import { InputValues, Node, OutputValues } from "@google-labs/breadboard";

export function isNode(obj: any): obj is Node<InputValues, OutputValues> {
  // return (
  //   obj &&
  //   typeof obj == "object" &&
  //   "id" in obj &&
  //   "type" in obj &&
  //   "configuration" in obj
  // );
  if (typeof obj !== "object") {
    console.error("node object is not an object", obj);
    return false;
  }
  if (obj === null) {
    console.error("node object is null", obj);
    return false;
  }
  if (!("id" in obj)) {
    console.error("node object does not have an id key", obj);
    return false;
  }
  if (!("type" in obj)) {
    console.error("node object does not have a type key", obj);
    return false;
  }
  return true;
}
