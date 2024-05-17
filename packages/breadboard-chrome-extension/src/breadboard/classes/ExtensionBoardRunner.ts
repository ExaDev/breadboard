import {
  asRuntimeKit,
  BoardRunner,
  GraphDescriptor,
  InputValues,
} from "@google-labs/breadboard";
import Core from "@google-labs/core-kit";

export class ExtensionBoardRunner {
  #serializedBoard: GraphDescriptor;

  constructor(serializedBoard: GraphDescriptor) {
    this.#serializedBoard = serializedBoard;
  }

  async runBoard(inputValues: InputValues) {
    const runner = await BoardRunner.fromGraphDescriptor(this.#serializedBoard);
    for await (const stop of runner.run({ kits: [asRuntimeKit(Core)] })) {
      if (stop.type === "input") {
        stop.inputs = inputValues;
      } else if (stop.type === "output") {
        console.log(stop.outputs);
      }
    }
  }
}
