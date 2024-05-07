import { Edge } from "@google-labs/breadboard";

export function isEdge(obj: any): obj is Edge {
  // return (
  //   obj &&
  //   typeof obj == "object" &&
  //   "from" in obj &&
  //   "to" in obj &&
  //   "in" in obj &&
  //   "out" in obj
  // );
  if (typeof obj !== "object") {
    console.error("edge object is not an object", obj);
    return false;
  }
  if (obj === null) {
    console.error("edge object is null", obj);
    return false;
  }
  ////////////////////////////////////////////////////////////////////////////////
  if (!("from" in obj)) {
    console.error("edge object does not have a from key", obj);
    return false;
  }
  if (typeof obj.from !== "string") {
    console.error("edge object from key is not a string", obj);
    return false;
  }
  if (obj.from.trim().length === 0) {
    console.error("edge object from key is empty", obj);
    return false;
  }
  ////////////////////////////////////////////////////////////////////////////////

  if (!("to" in obj)) {
    console.error("edge object does not have a to key", obj);
    return false;
  }
  if (typeof obj.to !== "string") {
    console.error("edge object to key is not a string", obj);
    return false;
  }
  if (obj.to.trim().length === 0) {
    console.error('edge object "to" key is empty', obj);
    return false;
  }
  ////////////////////////////////////////////////////////////////////////////////

  if (!("out" in obj)) {
    console.error("edge object does not have an out key", obj);
    return false;
  }
  if (typeof obj.out !== "string") {
    console.error("edge object out key is not a string", obj);
    return false;
  }
  if (obj.out.trim().length === 0) {
    console.error("edge object out key is empty", obj);
    return false;
  }

  ////////////////////////////////////////////////////////////////////////////////

  if (obj.out != "*") {
    if (!("in" in obj)) {
      console.error("edge object does not have an in key", obj);
      return false;
    }
    if (typeof obj.in !== "string") {
      console.error("edge object in key is not a string", obj);
      return false;
    }
    if (obj.in.trim().length === 0) {
      console.error("edge object in key is empty", obj);
      return false;
    }
  }

  return true;
}
