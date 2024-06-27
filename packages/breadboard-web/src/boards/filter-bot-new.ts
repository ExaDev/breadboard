import {
  anyOf,
  array,
  board,
  enumeration,
  input,
  object,
  optional,
  output,
} from "@breadboard-ai/build";
import { agents } from "@google-labs/agent-kit";
import { Schema, base } from "@google-labs/breadboard";
import { code, passthrough } from "@google-labs/core-kit";
import { LlmContentRole } from "../../../agent-kit/dist/src/context";
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

const dimitriBlog = {
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
};
const cppGitHubIo = {
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
};
const cppGitHub = {
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
};
const exampleSearchResults: CSEResult[] = [dimitriBlog, cppGitHubIo, cppGitHub];

const promptTemplate = input({
  title: "Task template",
  default: [
    `Classify the search results based on the user's query: "{{query}}"`,
    "Select the search results that are relevant to the user's query.",
    "Reject the search results that are not relevant to the user's query.",
    "Provide a summary of the search results that were selected and rejected.",
    "The candidates are:",
    "{{candidates}}",
    "",
    "The rejected search results are:",
    "{{rejected}}",
    "",
    "The selected search results are:",
    "{{selected}}",
  ].join(". \n"),
});

const candidatesExamples = [exampleSearchResults].map((x) => JSON.stringify(x));
const candidatesInput = input({
  title: "Candidates",
  type: array({
    jsonSchema: {},
  }),
  examples: [[dimitriBlog]],
});
const persona = input({
  title: "Persona",
  default:
    "Your purpose is to help classify search results to select and reject based on the user's query.",
});

type ContextMakerNodeInput = {
  role?: LlmContentRole;
  text: string;
};
type ContextMakerNodeOutput = {
  context: {
    role?: LlmContentRole;
    parts: { text: string }[];
  };
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

function contextMaker(inputs: { text: string; role: null }) {
  const parts = [{ text: inputs.text }];
  return {
    context: inputs.role ? { role: inputs.role, parts } : { parts },
  };
}
// const makeContext = code<ContextMakerNodeInput, ContextMakerNodeOutput>(
const makeAgentInput = code(
  {
    text: "foo",
    role: null,
  },
  {
    context: object({
      role: optional("string"),
      parts: array({
        jsonSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              title: "Text",
            },
          },
        },
      }),
    }),
  },
  contextMaker
);

// const foo =

const rejectedInput = input({
  title: "Rejected",
  type: array({
    jsonSchema: {},
  }),
  examples: [[cppGitHub, cppGitHubIo]],
});
const acceptedInput = input({
  title: "Accepted",
  type: array({
    jsonSchema: {},
  }),
  examples: [[dimitriBlog]],
});

function injectProperty<
  In extends Record<string, unknown>,
  K extends string,
  V,
  Out extends In & {
    [key in K]: V;
  },
>({ obj, key, value }: { obj?: In; key: K; value: V }): { obj: Out } {
  return {
    obj: {
      ...obj,
      [key]: value,
    } as Out,
  };
}

const combinedArraysObject = code(
  {
    $metadata: { title: "Inject Candidates" },
    key: "candidates",
    value: candidatesInput,
    obj: code(
      {
        $metadata: { title: "Inject Rejected" },
        key: "rejected",
        value: rejectedInput,
        obj: code(
          {
            $metadata: { title: "Inject Accepted" },
            key: "accepted",
            value: acceptedInput,
            // obj: {},
          },
          {
            obj: object({
              accepted: array({ jsonSchema: {} }),
            }),
          },
          injectProperty
        ).outputs.obj,
      },
      {
        obj: object({
          accepted: array({ jsonSchema: {} }),
          rejected: array({ jsonSchema: {} }),
        }),
      },
      injectProperty
    ).outputs.obj,
  },
  {
    obj: object({
      accepted: array({ jsonSchema: {} }),
      candidates: array({ jsonSchema: {} }),
      rejected: array({ jsonSchema: {} }),
    }),
  },
  injectProperty
);

const spaces = input({
  title: "Spaces",
  type: anyOf("number", enumeration("\t")),
  default: 2,
});
const stringifyCombinedArray = code(
  {
    spaces: spaces,
    value: combinedArraysObject.outputs.obj,
  },
  {
    result: "string",
  },
  (inputs): { result: string } => ({
    result: JSON.stringify(inputs.value, null, inputs.spaces),
  })
);

const handleMissing = input({
  title: "Handle Missing",
  type: enumeration("error", "keepPlaceholder", "removePlaceholder"),
  default: "error",
});
const stringTemplate = code(
  {
    $metadata: { title: "String Template" },
    template: promptTemplate,
    values: combinedArraysObject.outputs.obj,
    handleMissing,
    // values: str,
  },
  {
    result: "string",
  },
  ({ template, values, handleMissing }) => {
    // const result = template;

    const keys = Object.keys(values);
    const placeholders: string[] = template.match(/{{\w+}}/g) || [];

    const missingKeys = placeholders.filter(
      (placeholder) => !keys.includes(placeholder.slice(2, -2))
    );
    const missingPlaceholders = keys.filter(
      (key) => !placeholders.includes(`{{${key}}}`)
    );

    if (handleMissing === "error" && missingKeys.length) {
      throw new Error(`Template missing keys: ${missingKeys.join(", ")}`);
    }
    if (handleMissing === "error" && missingPlaceholders.length) {
      throw new Error(
        `Template has extra keys: ${missingPlaceholders.join(", ")}`
      );
    }

    const allKeys: Set<string> = new Set([...keys, ...placeholders]);

    const result = Array.from(allKeys).reduce((acc, key) => {
      // return acc.replace(new RegExp(`{{${key}}}`, "g"), values[key] as string);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value: unknown | null = (values as any)[key];

      if (!value) {
        if (handleMissing === "removePlaceholder") {
          return acc.replace(new RegExp(`{{${key}}}`, "g"), "");
        } else if (handleMissing === "keepPlaceholder") {
          return acc;
        }
      }

      return acc.replace(new RegExp(`{{${key}}}`, "g"), value as string);
    }, template);

    return { result };
  }
);

// const stringify = code<
//   { value?: unknown; space?: number | string },
//   { result: string }
// >((inputs) => ({ result: JSON.stringify(inputs.value, null, inputs.space) }));

// const stringifiedAccepted = stringify({ value: accepted });
// const stringifiedRejected = stringify({ value: rejected });
// const task = stringTemplate({
//   template: promptTemplate as unknown as string,
//   values: {
//     prompt: promptTemplate as unknown as string,
//     candidates: stringify({ value: candidatesExamples })
//       .result as unknown as string,
//     accepted: stringifiedAccepted.result as unknown as string,
//     rejected: stringifiedRejected.result as unknown as string,
//   },
// });

// const makeAgentInput = makeContext({
//   $metadata: {
//     title: "Agent Input",
//   },
//   text: task.result,
//   role: "user",
// });

type JoinStringNodeInput = {
  a: string;
  b: string;
  delimiter?: string;
};

// const joinString = code<
//   JoinStringNodeInput,
//   {
//     result: string;
//   }
// >(({ a, b, delimiter = " " }: JoinStringNodeInput): { result: string } => ({
//   result: a + delimiter + b,
// }));

// const persona = joinString({
//   $metadata: {
//     title: "Persona",
//   },
//   a: input.tone as unknown as string,
//   b: input.voice as unknown as string,
//   delimiter: "\n\n",
// });

// const makePersonaContext = makeContext({
//   $metadata: {
//     title: "Persona context",
//   },
//   text: persona as unknown as string,
// });

const human = agents.human({});
const bot = agents.specialist({
  $metadata: { title: "Chat Bot" },
  in: base.input(),
  // in: agents.human().context,
  // in: human.context,
  // in: makeAgentInput.context,
  // persona: makePersonaContext.context,
  // task: task,
  model: "gemini-1.5-flash-latest",
  responseMimeType: "application/json",
});
// const output = base.output({
//   $metadata: {
//     title: "Output",
//   },
//   ...input,
// });

// bot.out.as("reply").to(output);

const inputPassthrough = passthrough({
  // promptTemplate,
  // candidates: candidatesInput,
  // persona,
  // accepted: acceptedInput,
  // rejected: rejectedInput,
  // result: bot.unsafeOutput("out") as unknown as string,
  // bot: bot,
  // makeAgentInput: makeAgentInput.context as unknown as string,
  // bot: bot.out as unknown as string,
  // ...(bot as unknown as Record<string, unknown>),
});

// output(inputPassthrough.outputs.accepted, {});
export default board({
  title: "Filter Bot With Build API",
  description: "Filter search results based on user query",
  version: "0.0.1",
  inputs: {
    // spaces,
    // handleMissing,
    candidates: candidatesInput,
    promptTemplate,
    rejected: rejectedInput,
    accepted: acceptedInput,
  },
  outputs: {
    // stringified: output(stringify.outputs.result, {}),
    templateValues: output(combinedArraysObject.outputs.obj, {}),
    stringTemplate: output(stringTemplate.outputs.result, {}),
    // result: output(unsafeCast(bot.out, "string"), {}),
    // promptTemplate: output(pass.outputs.candidates, {}),
    ...inputPassthrough.outputs,
  },
});

