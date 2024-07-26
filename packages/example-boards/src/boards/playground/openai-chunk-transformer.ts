/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { board, input, output } from "@breadboard-ai/build";
import { jsonata } from "@google-labs/json-kit";

const chunk = input({
  $id: "chunk"
});

const transform = jsonata({
  $id: "transformCompletion",
  expression: 'choices[0].delta.content ? choices[0].delta.content : ""',
  json: chunk,
}).unsafeOutput("result");

export const chunkTransformer = board({
  title: "OpenAI Chunk Transformer",
  description: "A board for chunking OpenaAI output streams into text chunks.",
  version: "0.1.0",
  inputs: { chunk },
  outputs: { result: output(transform, { id: "result" }) },
});