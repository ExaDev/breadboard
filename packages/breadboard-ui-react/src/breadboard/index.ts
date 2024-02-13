import { Board, Schema } from "@google-labs/breadboard";

const board = new Board();

export const inputSchema = {
    type: "object",
    properties: {
		message: {
        type: "string",
        title: "Hello Message",
        description: "The input message saying hello"
      }
    }
  } satisfies Schema

board.input({
  $id: "input-message",
  schema: inputSchema
}).wire("message", board.output());

export { board };
export { board as default };