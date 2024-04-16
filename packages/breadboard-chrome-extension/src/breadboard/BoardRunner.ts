import { InputValues } from "@google-labs/breadboard";

class BoardRunner {
  boardParams: InputValues;

  constructor(boardParams: InputValues) {
    this.boardParams = boardParams;
  }

  async runBoard() {
    this.boardParams;
  }
}

export default BoardRunner;
