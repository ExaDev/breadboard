/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import test from "ava";

import { InputValues } from "../../../src/new/runner/types.js";
import { Scope } from "../../../src/new/runner/scope.js";
import { BaseNode } from "../../../src/new/runner/node.js";

// Builds a test graph just using the primitives.
// Note that these nodes would be garbage collected if they weren't pinned.
function buildTestGraph(scope: Scope) {
  const input = new BaseNode("input", scope);
  const noop = new BaseNode("noop", scope);
  const output = new BaseNode("output", scope);
  noop.addIncomingEdge(input, "foo", "foo");
  output.addIncomingEdge(noop, "foo", "bar");

  scope.pin(output);
}

test("pin node and serialize scope", async (t) => {
  const scope = new Scope();

  buildTestGraph(scope);

  const serialized = await scope.serialize();

  t.like(serialized, {
    nodes: [
      { id: "output-3", type: "output" },
      { id: "noop-2", type: "noop" },
      { id: "input-1", type: "input" },
    ],
    edges: [
      { from: "noop-2", to: "output-3", out: "foo", in: "bar" },
      { from: "input-1", to: "noop-2", out: "foo", in: "foo" },
    ],
  });
});

test("pin node and invoke scope", async (t) => {
  const scope = new Scope();

  buildTestGraph(scope);

  const inputs = { foo: "success" } satisfies InputValues;
  let outputs: InputValues = { bar: "should be overwritten" };

  const handlers = {
    input: () => inputs,
    noop: (inputs: InputValues) => inputs,
    output: (inputs: InputValues) => {
      outputs = inputs;
      return inputs;
    },
  };

  scope.addHandlers(handlers);

  await scope.invoke();

  t.is(outputs.bar, "success");
});
