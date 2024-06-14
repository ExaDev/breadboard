import { agents } from "@google-labs/agent-kit";
import { base, code } from "@google-labs/breadboard";
import { Context, LlmContentRole } from "../../../agent-kit/dist/src/context";

const input = base.input({
  schema: {
    properties: {
      context: {
        type: "array",
        title: "Context",
        examples: [],
        items: {
          type: "object",
          behavior: ["llm-content"],
          format: "text-inline",
        },
        default: JSON.stringify([
          { role: "user", parts: [{ text: "Artificial Intelligence" }] },
          // { role: "user", parts: [{ text: "" }] },
        ]),
        description: "What topic are you interested in?",
      },
      // persona: {
      //   type: "string",
      //   format: "multiline",
      //   default: [
      //     "Provide a summary of the discussions around a topic on Hacker News.",
      //     "Use the tools provided to access Hacker News and perform research based on the user's input.",
      //   ].join("\n"),
      // },
    },
    type: "object",
    required: [],
  },
  $metadata: {
    title: "Input",
  },
});
const output = base.output({});

type ContextMakerNodeInput = {
  role?: LlmContentRole;
  text: string;
};

const generateContextObject = (inputs: ContextMakerNodeInput) => {
  const parts = [{ text: inputs.text }];
  return {
    context: inputs.role ? { role: inputs.role, parts } : { parts },
  };
};

const contextPartMaker = code<ContextMakerNodeInput, { context: Context }>(
  generateContextObject
);

import hackerNewsAlgoliaItems from "./hacker-news-algolia-items";
import hackerNewsAlgoliaSearch from "./hacker-news-algolia-search";
import hackerNewsFirebaseStoryFromId from "./hacker-news-firebase-story-from-id";
import hackerNewsFirebaseTopStoryIds from "./hacker-news-firebase-top-story-ids";
import hackerNewsSimplifiedAlgoliaCommentSearch from "./hacker-news-simplified-algolia-comment-search";
import hackerNewsSimplifiedAlgoliaSearch from "./hacker-news-simplified-algolia-search";
import hackerNewsSimplifiedAlgoliaStorySearch from "./hacker-news-simplified-algolia-story-search";

const searcher = agents.specialist({
  $metadata: { title: "Hacker News Research Agent" },
  tools: [
    hackerNewsSimplifiedAlgoliaStorySearch,
    hackerNewsSimplifiedAlgoliaCommentSearch,
    hackerNewsAlgoliaItems,
    hackerNewsSimplifiedAlgoliaSearch,
    hackerNewsFirebaseStoryFromId,
    hackerNewsFirebaseTopStoryIds,
    hackerNewsAlgoliaSearch,
  ],
  model: "gemini-1.5-flash-latest",
  persona: generateContextObject({
    text: [
      "You are a Hacker News Research Agent.",
      "Use markdown to format your response.",
      "Do not infer or make assumptions about any information.",
    ].join("\n"),
  }).context,
  task: generateContextObject({
    text: [
      "Retrieve information from Hacker News using the tools provided",
      "Based on the user's query you will find the most relevant posts on Hacker News.",
      "You will list the post titles, story urls, and discsussion urls for the most relevant results.",
      "For each post, you will retrieve the most relevant comments and summarise the overall discussion.",
      "Return the results of your research",
      "When you have completed all of your tasks, you will reply with '##DONE##'",
    ].join("\n"),
  }).context,
});

const looper = agents.looper({
  $metadata: { title: "Looper" },
  model: "gemini-1.5-flash-latest",
  context: searcher.out,
  task: generateContextObject({
    text: [`Chat until "##DONE##".`].join("\n"),
  }).context,
});
input.context.as("context").to(looper);
looper.loop.as("in").to(searcher);

looper.done.to(output);
looper.loop.to(base.output())

const serialised = await input.serialize({
  title: "Hacker News Research Agent",
});

export { serialised as graph, input, output };
export default serialised;
