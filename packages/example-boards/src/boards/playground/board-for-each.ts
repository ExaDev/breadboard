/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { board, converge, input, loopback, output } from "@breadboard-ai/build";
import { code, invoke, passthrough } from "@google-labs/core-kit";

// TODO have a board and then serialize it as a default
export const boardJSON = input({
  type: "unknown",
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
  type: "unknown",
  title: "array input",
  default: ["What", "did", "the", "fox", "say?"]
})

const itemLoop = loopback({ type: "unknown" })

// converge so we can provide an initial input but also cycle on this node with the next array
const pop = code({$id:"Pop", array: converge(arrayInput, itemLoop) }, { array: "unknown", item: "unknown" }, ({ array }) => {
  // @ts-ignore
  const [item, ...rest] = array;

  if (item) {
    return { array: rest, item: item } as any;
  }
  return {} as any;
})

const boardLoop = loopback({ type: "unknown" })

// @ts-ignore
// passthrough complains because of converge()
const passthroughOutput = passthrough({ board: converge(boardJSON, boardLoop), item: pop.outputs.item, array: pop.outputs.array });
// start the cycle again until array is empty
boardLoop.resolve(passthroughOutput.outputs.board)
itemLoop.resolve(passthroughOutput.outputs.array)


const res = invoke({
  $id: "Board Output",
  $board: passthroughOutput.outputs.board,
  object: passthroughOutput.outputs.item
}).unsafeOutput("object");


const arrayLoop = loopback({type:"unknown"})

const accummulate = code({$id: "Accummulate", item: res, array: converge([] , arrayLoop) }, {array: "unknown"}, ({ item, array}) => {
  
  return { array: [...array as [] , item] } as any;
}).outputs.array

arrayLoop.resolve(accummulate)

const emitter = code({$id:"Emitter", a: pop.outputs.array, b: accummulate}, {emit: "unknown", a:"unknown", b:"unknown"}, ({a, b}) => {
  let emit = undefined;
  // @ts-ignore
  if (!a || a.length === 0) {
    emit = b;
  }

  return { emit: emit } as any;
})


export default board({
  title: "Board for each",
  version: "0.1.0",
  inputs: { board: boardJSON, array: arrayInput },
  outputs: { outputs: output(emitter.outputs.emit)}
})

