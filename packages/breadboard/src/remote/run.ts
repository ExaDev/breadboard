/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Diagnostics } from "../harness/diagnostics.js";
import { extractError } from "../harness/error.js";
import { RunResult } from "../run.js";
import { createRunStateManager } from "../run/index.js";
import { runGraph } from "../run/run-graph.js";
import { RunState } from "../run/types.js";
import {
  WritableResult,
  streamsToAsyncIterable,
  stubOutStreams,
} from "../stream.js";
import { timestamp } from "../timestamp.js";
import {
  GraphDescriptor,
  InputValues,
  NodeHandlerContext,
  OutputValues,
} from "../types.js";
import {
  AnyClientRunResult,
  AnyRunRequestMessage,
  AnyRunResponseMessage,
  InputResolveRequest,
  RunClientTransport,
  RunRequestMessage,
  ServerTransport,
} from "./types.js";

const resumeRun = (request: AnyRunRequestMessage) => {
  const [type, , state] = request;

  // There may not be any state to resume from.
  if (!state) return undefined;

  if (state.length > 1) {
    throw new Error("I don't yet know how to resume from nested subgraphs.");
  }

  const result = RunResult.load(state[0].state as string);
  if (type === "input") {
    const [, inputs] = request;
    result.inputs = inputs.inputs;
  }
  return result;
};

type RunServerTransport = ServerTransport<
  AnyRunRequestMessage,
  AnyRunResponseMessage
>;

export class RunServer {
  #transport: RunServerTransport;

  constructor(transport: RunServerTransport) {
    this.#transport = transport;
  }

  async serve(
    runner: GraphDescriptor,
    diagnostics = false,
    context: NodeHandlerContext = {}
  ) {
    const stream = this.#transport.createServerStream();
    const requestReader = stream.readableRequests.getReader();
    let request = await requestReader.read();
    if (request.done) return;

    const result = resumeRun(request.value);
    const responses = stream.writableResponses.getWriter();

    const servingContext: NodeHandlerContext = {
      ...context,
      state: createRunStateManager(),
      probe: diagnostics
        ? new Diagnostics(async (message) => {
            const { type, data } = message;
            const response = [type, stubOutStreams(data)];
            if (type == "nodestart") {
              response.push(message.state);
            }
            await responses.write(response as AnyRunResponseMessage);
          })
        : undefined,
    };

    try {
      for await (const stop of runGraph(
        runner,
        servingContext,
        result?.state
      )) {
        if (stop.type === "input") {
          const state = stop.runState as RunState;
          const { node, inputArguments, timestamp, path, invocationId } = stop;
          const bubbled = invocationId == -1;
          await responses.write([
            "input",
            { node, inputArguments, timestamp, path, bubbled },
            state,
          ]);
          request = await requestReader.read();
          if (request.done) {
            await responses.close();
            return;
          } else {
            const [type, inputs] = request.value;
            if (type === "input") {
              stop.inputs = inputs.inputs;
            }
          }
        } else if (stop.type === "output") {
          const { node, outputs, timestamp, path, invocationId } = stop;
          const bubbled = invocationId == -1;
          await responses.write([
            "output",
            { node, outputs, timestamp, path, bubbled },
          ]);
        }
      }
      await responses.write(["end", { timestamp: timestamp() }]);
      await responses.close();
    } catch (e) {
      const error = extractError(e);
      console.error("Run Server error:", error);
      await responses.write(["error", { error, timestamp: timestamp() }]);
      await responses.close();
    }
  }
}

const createRunResult = (
  response: WritableResult<AnyRunResponseMessage, AnyRunRequestMessage>
): AnyClientRunResult => {
  const [type, data, state] = response.data;
  const reply = async (chunk: AnyRunRequestMessage[1]) => {
    if (type !== "input") {
      throw new Error(
        "For now, we cannot reply to messages other than 'input'."
      );
    }
    await response.reply([type, chunk as InputResolveRequest, state]);
  };
  return {
    type,
    data,
    state,
    reply,
  } as AnyClientRunResult;
};

export class RunClient {
  #transport: RunClientTransport;

  constructor(clientTransport: RunClientTransport) {
    this.#transport = clientTransport;
  }

  async *run(state?: RunState): AsyncGenerator<AnyClientRunResult> {
    const stream = this.#transport.createClientStream();
    const server = streamsToAsyncIterable(
      stream.writableRequests,
      stream.readableResponses
    );
    const request = ["run", {}] as RunRequestMessage;
    state && request.push(state);
    await server.start(request);
    for await (const response of server) {
      yield createRunResult(response);
    }
  }

  async runOnce(inputs: InputValues): Promise<OutputValues> {
    let outputs;

    for await (const stop of this.run()) {
      const { type, data } = stop;
      if (type === "input") {
        stop.reply({ inputs });
      } else if (type === "output") {
        outputs = data.outputs;
        break;
      }
    }

    return outputs || {};
  }
}
