/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { annotate, array, board, converge, input, loopback, object, output } from "@breadboard-ai/build";
import { code, invoke, passthrough } from "@google-labs/core-kit";

// TODO have a board and then serialize it as a default
export const boardJSON = input({
  type: annotate(object({}), {
    behavior: ["board"],
  }),
  title: "board json",
  default: {
    "edges": [
      { "from": "fn-4", "to": "output-5", "out": "*", "in": "" },
      { "from": "input-3", "to": "fn-4", "out": "object", "in": "object" }],
    "nodes": [
      { "id": "output-5", "type": "output", "configuration": {}, "metadata": { "title": "Output" } },
      { "id": "fn-4", "type": "runJavascript", "configuration": { "code": "const fn_4 = inputs=>{const{object}=inputs;return{object:object.split(\"\").map(c=>c===c.toUpperCase()?c.toLowerCase():c.toUpperCase()).join(\"\")}};", "name": "fn_4", "raw": true } },
      { "id": "input-3", "type": "input", "configuration": { "schema": { "type": "object", "properties": { "object": { "type": "string", "title": "object" } }, "required": ["object"] } }, "metadata": { "title": "Input" } }], "graphs": {}
  }
})

const arrayInput = input({
  type: array("unknown"),
  title: "array input",
  default: ["What", "did", "the", "fox", "say!"]
})

const itemLoop = loopback({ type: array("unknown") })

// converge so we can provide an initial input but also cycle on this node with the next array
const pop = code({ $id: "Pop", array: converge(arrayInput, itemLoop) }, { array: array("unknown"), item: "unknown" }, ({ array }) => {
  const [item, ...rest] = array;

  if (item) {
    return { array: rest, item: item } as any;
  }
  return {} as any;
})

const boardLoop = loopback({
  type: annotate(object({}), {
    behavior: ["board"],
  }),
})

// passthrough complains because of converge()
// @ts-ignore
const passthroughOutput = passthrough({ board: converge(boardJSON, boardLoop), item: pop.outputs.item, array: pop.outputs.array });
// start the cycle again until array is empty
boardLoop.resolve(passthroughOutput.outputs.board)
itemLoop.resolve(passthroughOutput.outputs.array)


const invokeOutput = invoke({
  $id: "Board Output",
  $board: passthroughOutput.outputs.board,
  object: passthroughOutput.outputs.item
}).unsafeOutput("object");

// TODO REFACTOR ACCUMMULATE AND EMITTER TO BE A FUNCTION THAT RETURNS A CODE NODE INSTEAD
const arrayLoop = loopback({ type: array("unknown") })
const accummulate = code({ $id: "Accummulate", item: invokeOutput, array: converge([], arrayLoop) }, { array: array("unknown") }, ({ item, array }) => {

  return { array: [...array as [], item] } as any;
}).outputs.array

arrayLoop.resolve(accummulate)

const emitter = code({ $id: "Emitter", a: pop.outputs.array, b: accummulate }, { emit: array("unknown"), a: array("unknown"), b: array("unknown") }, ({ a, b }) => {
  let emit = undefined;
  if (!a || a.length === 0) {
    emit = b;
  }

  return { emit: emit } as any;
})

export default board({
  title: "Board for each",
  version: "0.1.0",
  inputs: { board: boardJSON, array: arrayInput },
  outputs: { outputs: output(emitter.outputs.emit) }
})

