/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  NewNodeFactory,
  NewNodeValue,
  base,
  board,
} from "@google-labs/breadboard";
import {
  checkAreWeDone,
  combineContexts,
  looperTaskAdder,
  progressReader,
  splitStartAdder,
  userPartsAdder,
} from "../context.js";
import { gemini } from "@google-labs/gemini-kit";
import { core } from "@google-labs/core-kit";
import {
  boardInvocationAssembler,
  boardToFunction,
  functionDeclarationsFormatter,
  functionOrTextRouter,
  invokeBoardWithArgs,
  responseCollator,
} from "../function-calling.js";

export type SpecialistType = NewNodeFactory<
  {
    in: NewNodeValue;
  },
  {
    out: NewNodeValue;
  }
>;

const specialist = await board(({ in: context, persona, task, tools }) => {
  context
    .title("Context in")
    .description("Incoming conversation context")
    .isArray()
    .behavior("llm-content");
  persona
    .title("Persona")
    .description(
      "Describe the worker's skills, capabilities, mindset, and thinking process"
    )
    .isObject()
    .behavior("llm-content", "config");
  task
    .title("Task")
    .description(
      "(Optional) Provide a specific task with clear instructions for the worker to complete using the conversation context"
    )
    .isObject()
    .optional()
    .default(JSON.stringify({}))
    .behavior("llm-content", "config");
  tools
    .title("Tools")
    .description(
      "(Optional) Add tools to this list for the worker to use when needed"
    )
    .isArray()
    .behavior("board", "config")
    .optional()
    .default("[]");

  const addTask = userPartsAdder({
    $metadata: { title: "Add Task", description: "Adding task to the prompt." },
    context,
    toAdd: task,
  });

  const readProgress = progressReader({
    $metadata: { title: "Read Progress so far" },
    context,
  });

  const addLooperTask = looperTaskAdder({
    $metadata: {
      title: "Add Looper Task",
      description: "If there is a pending Looper task, add it.",
    },
    context: addTask.context,
    progress: readProgress.progress,
  });

  const addSplitStart = splitStartAdder({
    $metadata: {
      title: "Add Split Start",
      description: "Marking the start of parallel processing in the context",
    },
    context: addLooperTask.context,
  });

  const boardToFunctionWithContext = core.curry({
    $metadata: {
      title: "Add Context",
      description: "Adding context to the board to function converter",
    },
    $board: "#boardToFunction",
    context: addSplitStart.context,
  });

  const turnBoardsToFunctions = core.map({
    $id: "turnBoardsToFunctions",
    $metadata: {
      title: "Turn Boards into Functions",
      description: "Turning provided boards into functions",
    },
    board: boardToFunctionWithContext.board,
    list: tools.isArray(),
  });

  const formatFunctionDeclarations = functionDeclarationsFormatter({
    $id: "formatFunctionDeclarations",
    $metadata: {
      title: "Format Function Declarations",
      description: "Formatting the function declarations",
    },
    list: turnBoardsToFunctions.list,
  });

  const generator = gemini.text({
    $metadata: {
      title: "Gemini API Call",
      description: "Applying Gemini to do work",
    },
    systemInstruction: persona,
    tools: formatFunctionDeclarations.tools,
    context: addLooperTask.context,
  });

  const routeToFunctionsOrText = functionOrTextRouter({
    $id: "router",
    $metadata: {
      title: "Router",
      description: "Routing to either function call invocation or text reply",
    },
    context: generator.context,
  });

  const assembleInvocations = boardInvocationAssembler({
    $id: "assembleBoardInvoke",
    $metadata: {
      title: "Assemble Tool Invoke",
      description: "Assembling the tool invocation based on Gemini response",
    },
    urlMap: formatFunctionDeclarations.urlMap,
    context: routeToFunctionsOrText.context,
    functionCalls: routeToFunctionsOrText.functionCalls,
  });

  const mapInvocations = core.map({
    $metadata: {
      title: "Invoke Tools in Parallel",
      description: "Invoking tools in parallel",
    },
    list: assembleInvocations.list.isArray(),
    board: "#invokeBoardWithArgs",
  });

  const formatToolResponse = responseCollator({
    $metadata: {
      title: "Format Tool Response",
      description: "Formatting tool response",
    },
    context: addSplitStart.context,
    response: mapInvocations.list,
  });

  const addToolResponseToContext = combineContexts({
    $metadata: {
      title: "Add Tool Response",
      description: "Adding tool response to context",
    },
    ...formatToolResponse,
  });

  base.output({
    $metadata: {
      title: "Tool Output",
      description: "Return tool results as output",
    },
    out: addToolResponseToContext.context
      .title("Context out")
      .isArray()
      .behavior("llm-content"),
  });

  const areWeDoneChecker = checkAreWeDone({
    $metadata: {
      title: "Done Check",
      description: "Checking for the 'Done' marker",
    },
    context: addLooperTask.context,
    generated: routeToFunctionsOrText.context,
    text: routeToFunctionsOrText.text,
  });

  return {
    out: areWeDoneChecker.context
      .title("Context out")
      .isArray()
      .behavior("llm-content"),
  };
}).serialize({
  title: "Specialist",
  metadata: {
    icon: "smart-toy",
    help: {
      url: "https://breadboard-ai.github.io/breadboard/docs/kits/agents/#specialist",
    },
  },
  description:
    "Given instructions on how to act, performs a single task, optionally invoking tools.",
});

specialist.graphs = { boardToFunction, invokeBoardWithArgs };

export default specialist;
