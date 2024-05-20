import {
  asRuntimeKit,
  BoardRunner,
  GraphDescriptor,
  InputValues,
  Kit,
} from "@google-labs/breadboard";
import Core from "@google-labs/core-kit";

export class ExtensionBoardRunner {
  #serializedBoard: GraphDescriptor;
  #userKit?: Kit;

  constructor(serializedBoard: GraphDescriptor, userKit?: Kit) {
    this.#serializedBoard = serializedBoard;
    this.#userKit = userKit;
  }

  async runBoard(inputValues: InputValues) {
    const runner = await BoardRunner.fromGraphDescriptor(this.#serializedBoard);
    const coreKit = asRuntimeKit(Core);
    const kits = this.#userKit ? [coreKit, this.#userKit] : [coreKit];
    for await (const stop of runner.run({
      kits: kits,
    })) {
      if (stop.type === "input") {
        stop.inputs = inputValues;
      } else if (stop.type === "output") {
        return stop.outputs;
      }
    }
  }
}
