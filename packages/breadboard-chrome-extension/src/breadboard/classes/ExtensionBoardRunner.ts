import {
  asRuntimeKit,
  BoardRunner,
  GraphDescriptor,
  InputValues,
  Kit,
  KitConstructor,
} from "@google-labs/breadboard";
import Core from "@google-labs/core-kit";

export class ExtensionBoardRunner {
  #serializedBoard: GraphDescriptor;
  #userKits: Kit[];

  constructor(
    serializedBoard: GraphDescriptor,
    userKits: KitConstructor<Kit>[]
  ) {
    this.#serializedBoard = serializedBoard;
    this.#userKits = userKits.map((kitConstructor) =>
      asRuntimeKit(kitConstructor)
    );
  }

  async runBoard(inputValues: InputValues) {
    const runner = await BoardRunner.fromGraphDescriptor(this.#serializedBoard);
    const coreKit = asRuntimeKit(Core);
    const kits = this.#userKits.concat(coreKit);
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
