import { Edge } from "@google-labs/breadboard";


export function isEdge(obj: any): obj is Edge {
  return (
    obj &&
    typeof obj == "object" &&
    "from" in obj &&
    "to" in obj &&
    "in" in obj &&
    "out" in obj
  );
}
