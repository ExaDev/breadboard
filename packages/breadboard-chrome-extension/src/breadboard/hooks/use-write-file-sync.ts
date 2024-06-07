import path from "path";
import fs from "fs";
import { GraphDescriptor } from "@google-labs/breadboard";

const useWriteFileSync = (serializedBoard: GraphDescriptor) => {
  fs.writeFileSync(
    path.join(".", `/src/breadboard/graphs/${serializedBoard.title}.json`),
    JSON.stringify(serializedBoard, null, "\t")
  );
};

export default useWriteFileSync;
