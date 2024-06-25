import { agents } from "@google-labs/agent-kit";
import { Schema, base, code } from "@google-labs/breadboard";
import { Context, LlmContentRole } from "../../../agent-kit/dist/src/context";
export type CSEResult = {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
};

const exampleSearchResults: CSEResult[] = [
  {
    kind: "customsearch#result",
    title: "Breadboard: Main Page",
    htmlTitle: "<b>Breadboard</b>: Main Page",
    link: "http://google.github.io/breadboard/",
    displayLink: "google.github.io",
    snippet:
      "Breadboard is a scripting system designed to be easy to use for both programmers and game designers. Once a library of nodes has been defined, ...",
    htmlSnippet:
      "<b>Breadboard</b> is a scripting system designed to be easy to use for both programmers and game designers. Once a library of nodes has been defined,&nbsp;...",
    formattedUrl: "http://google.github.io/breadboard/",
    htmlFormattedUrl: "http://<b>google</b>.github.io/<b>breadboard</b>/",
  },
  {
    kind: "customsearch#result",
    title: "Breadboard: Main Page",
    htmlTitle: "<b>Breadboard</b>: Main Page",
    link: "http://google.github.io/breadboard/",
    displayLink: "google.github.io",
    snippet:
      "Breadboard is a scripting system designed to be easy to use for both programmers and game designers. Once a library of nodes has been defined, ...",
    htmlSnippet:
      "<b>Breadboard</b> is a scripting system designed to be easy to use for both programmers and game designers. Once a library of nodes has been defined,&nbsp;...",
    formattedUrl: "http://google.github.io/breadboard/",
    htmlFormattedUrl: "http://<b>google</b>.github.io/<b>breadboard</b>/",
  },
  {
    kind: "customsearch#result",
    title: "google/breadboard: C++ graph based event system - GitHub",
    htmlTitle: "google/breadboard: C++ graph based event system - GitHub",
    link: "https://github.com/google/breadboard",
    displayLink: "github.com",
    snippet:
      "Jan 10, 2023 ... C++ graph based event system. Contribute to google/breadboard development by creating an account on GitHub.",
    htmlSnippet:
      "Jan 10, 2023 <b>...</b> C++ graph based event system. Contribute to <b>google</b>/<b>breadboard</b> development by creating an account on GitHub.",
    formattedUrl: "https://github.com/google/breadboard",
    htmlFormattedUrl: "https://github.com/<b>google</b>/<b>breadboard</b>",
  },
];

const candidatesExamples = [exampleSearchResults].map((x) => JSON.stringify(x));
const input = base.input({
  $metadata: {
    title: "Input",
  },
  schema: {
    type: "object",
    properties: {
      prompt: {
        type: "string",
        title: "Prompt",
      },
      candidates: {
        title: "Candidates",
        type: "array",
        items: {},
        examples: candidatesExamples,
        default: candidatesExamples[0],
      },
      persona: {
        title: "Persona",
        type: "string",
        default:
          "Your purpose is to help classify search results to select and reject based on the user's query.",
      },
    },
    // } as unknown as Schema,
  } satisfies Schema,
});

type ContextMakerNodeInput = {
  role?: LlmContentRole;
  text: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const contextPartMakerSchema = {
  type: "object",
  properties: {
    text: {
      type: "string",
      title: "Text",
    },
    role: {
      type: "string",
      title: "Role",
    },
  },
} satisfies Schema;

const makeContext = code<ContextMakerNodeInput, { context: Context }>(
  (inputs: ContextMakerNodeInput) => {
    const parts = [{ text: inputs.text }];
    return {
      context: inputs.role ? { role: inputs.role, parts } : { parts },
    };
  }
);

const stringTemplate = code<{
  template: string;
  values: Record<string, string>;
}>(({ template, values }) => {
  let result = template;
  for (const key in values) {
    result = result.replace(`{{${key}}}`, values[key]);
  }
  return { result };
});

const makeAgentInput = makeContext({
  $metadata: {
    title: "Agent Input",
  },
  text: input.review as unknown as string,
  role: "user",
});

type JoinStringNodeInput = {
  a: string;
  b: string;
  delimiter?: string;
};

const joinString = code<
  JoinStringNodeInput,
  {
    result: string;
  }
>(({ a, b, delimiter = " " }: JoinStringNodeInput): { result: string } => ({
  result: a + delimiter + b,
}));

// const persona = joinString({
//   $metadata: {
//     title: "Persona",
//   },
//   a: input.tone as unknown as string,
//   b: input.voice as unknown as string,
//   delimiter: "\n\n",
// });

const makePersonaContext = makeContext({
  $metadata: {
    title: "Persona context",
  },
  text: input.persona as unknown as string,
});

const bot = agents.specialist({
  $metadata: { title: "Chat Bot" },
  in: makeAgentInput.context,
  persona: makePersonaContext.context,
  task: input.task,
  model: "gemini-1.5-flash-latest",
});

const output = base.output({
  $metadata: {
    title: "Output",
  },
  ...input,
});

bot.out.as("reply").to(output);

const serialised = await input.serialize({
  title: "Filter Bot",
});

export { serialised as default, serialised as graph, input, output };
