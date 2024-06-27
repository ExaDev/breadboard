import { Schema, base, board, code } from "@google-labs/breadboard";
import { core } from "@google-labs/core-kit";
import { gemini } from "@google-labs/gemini-kit";
import { Context, LlmContentRole } from "../../../agent-kit/dist/src/context";
import boardForEach from "./board-for-each";
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

const exampleCandidate = cppGitHubIo;
const acceptedExamples = [dimitriBlog];
const rejectedExamples = [cppGitHub];

// const candidatesExamples = [exampleSearchResults].map((x) => JSON.stringify(x));
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
        description: "The user's natural language query",
        default: "What is Google's Breadboard project?",
      },
      query: {
        type: "string",
        title: "Query",
        description: "The query that yielded the search results",
        default: "google breadboard",
      },
      candidate: {
        title: "Candidate",
        type: "object",
        examples: [JSON.stringify(exampleCandidate, null, 2)],
      },
      rejected: {
        title: "Rejected",
        type: "array",
        items: {},
        examples: [JSON.stringify(rejectedExamples, null, 2)],
      },
      accepted: {
        title: "Accepted",
        type: "array",
        items: {},
        examples: [JSON.stringify(acceptedExamples, null, 2)],
      },
      persona: {
        title: "Persona",
        type: "string",
        default:
          "Your purpose is to help classify search results to accept or reject a candidate element based on the user's query.",
      },
      taskTemplate: {
        type: "string",
        format: "multiline",
        title: "Task Template",
        default: [
          `Prompt: "{{prompt}}".`,
          ``,
          `Query: "{{query}}"`,
          ``,
          `Accepted: {{accepted}}`,
          ``,
          `Rejected: {{rejected}}`,
          ``,
          `Candidate: {{candidate}}`,
        ].join(" \n"),
      },
    },
  } satisfies Schema,
});

type ContextMakerNodeInput = {
  role?: LlmContentRole;
  text: string;
};

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

// const example = {
//   role: "user",
//   parts: [
//     {
//       text: `This ad is for my lawn care company that will fit into an inch of newspaper copy. It's called "Max's Lawn Care" and it should use the slogan "I care about your lawn." Emphasize the folksiness of it being a local, sole proprietorship that I started after graduating from high school.`,
//     },
//   ],
// };
const makeContext = code<ContextMakerNodeInput, { context: Context }>(
  (inputs: ContextMakerNodeInput) => {
    const parts = [{ text: inputs.text }];
    return {
      context: inputs.role ? { role: inputs.role, parts } : { parts },
    };
  }
);

const populateTemplate = code<{
  template: string;
  handleMissing?: "error" | "removePlaceholder" | "keepPlaceholder";
  values: Record<string, string>;
}>(({ template, values, handleMissing = "error" }) => {
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
    const value: unknown | null = values[key];

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
});

const makeMarkdownList = code<
  {
    items: string[];
    indentationSize?: number | "\t";
    intendationLevel?: number;
  },
  {
    result: string;
  }
>(
  ({
    items,
    indentationSize = "\t",
    intendationLevel = 0,
  }: {
    items: string[];
    indentationSize?: number | "\t";
    intendationLevel?: number;
  }): { result: string } => {
    const indentation: string =
      typeof indentationSize === "number"
        ? " ".repeat(indentationSize)
        : indentationSize;

    return {
      result: items
        .map((item) => `${indentation.repeat(intendationLevel)}- ${item}`)
        .join("\n"),
    };
  }
);

const stringify = code<
  { value: unknown; spaces: number | string },
  { result: string }
>(({ value, spaces = 2 }) => {
  return { result: JSON.stringify(value, null, spaces) };
});

const stringifierBoard = board((inputs) => ({
  item: stringify({
    value: inputs.item,
    spaces: 2,
  }).result,
}));

const stringifyAccepted = core.invoke({
  $metadata: {
    title: "Stringify Accepted",
  },
  $board: boardForEach,
  array: input.accepted,
  board: stringifierBoard,
});
stringifyAccepted.array.to(
  base.output({
    $metadata: {
      title: "Stringified Accepted",
    },
  })
);

const stringifyRejected = core.invoke({
  $metadata: {
    title: "Stringify Rejected",
  },
  $board: boardForEach,
  array: input.rejected,
  board: stringifierBoard,
});
stringifyRejected.array.to(
  base.output({
    $metadata: {
      title: "Stringified Rejected",
    },
  })
);

const stringifyCandidate = stringify({
  $metadata: {
    title: "Stringify Candidate",
  },
  value: input.candidate,
  spaces: 2,
});
stringifyCandidate.result.to(
  base.output({
    $metadata: {
      title: "Stringified Candidate",
    },
  })
);

const injectProperty = code<{
  key: string;
  value: unknown;
  obj: Record<string, unknown>;
}>(({ key, value, obj = {} }) => {
  return {
    obj: {
      ...obj,
      [key]: value,
    },
  };
});

// const tempalteValues = injectProperty({
//   $metadata: {
//     title: "Include Accepted",
//   },
//   key: "accepted",
//   value: stringifyAccepted.array,
//   obj: injectProperty({
//     $metadata: {
//       title: "Include Rejected",
//     },
//     key: "rejected",
//     value: stringifyRejected.array,
//     obj: injectProperty({
//       $metadata: {
//         title: "Include Candidate",
//       },
//       key: "candidate",
//       value: stringifyCandidate.result,
//       obj: {},
//     }),
//   }),
// });
const tempalteValues = injectProperty({
  $metadata: {
    title: "Include Accepted",
  },
  key: "accepted",
  value: stringifyAccepted.array,
  obj: injectProperty({
    $metadata: {
      title: "Include Rejected",
    },
    key: "rejected",
    value: stringifyRejected.array,
    obj: injectProperty({
      $metadata: {
        title: "Include Candidate",
      },
      key: "candidate",
      value: stringifyCandidate.result,
      obj: injectProperty({
        $metadata: {
          title: "Include Prompt",
        },
        key: "prompt",
        value: input.prompt,
        obj: injectProperty({
          $metadata: {
            title: "Include Query",
          },
          key: "query",
          value: input.query,
          obj: {},
        }).obj as unknown as Record<string, unknown>,
      }).obj as unknown as Record<string, unknown>,
    }).obj as unknown as Record<string, unknown>,
  }).obj as unknown as Record<string, unknown>,
});
const combined = injectProperty({
  $metadata: {
    title: "Include Candidate",
  },
  key: "candidate",
  value: stringifyCandidate.result,
  obj: {},
});
base.output({
  $metadata: {
    title: "TESTING TEMPLATE",
  },
  ...combined,
  // ...template
});
tempalteValues.to(base.output({}));

const populatedTemplate = populateTemplate({
  $metadata: {
    title: "Populate Task Template",
  },
  template: input.taskTemplate as unknown as string,
  values: tempalteValues.obj as unknown as Record<string, string>,
});
populatedTemplate.to(base.output({}));

// input.as({}).to(stringifyAccepted);

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

const makeAgentInput = makeContext({
  $metadata: {
    title: "Agent Input",
  },
  text: populatedTemplate.result as unknown as string,
  role: "user",
});
const taskInput = makeContext({
  $metadata: {
    title: "Agent Input",
  },
  text: populatedTemplate.result as unknown as string,
  role: "user",
});

// const bot = agents.specialist({
//   $metadata: { title: "Chat Bot" },
//   in: makeAgentInput.context,
//   persona: makePersonaContext.context,
//   task: taskInput.context,
//   model: "gemini-1.5-flash-latest",
// });

const generate = gemini.text({
  responseMimeType: "application/json",
  model: "gemini-1.5-flash-latest",
  context: makeContext({
    role: "user",
    $metadata: {
      title: "Gemini Context",
    },
    text: populatedTemplate.result as unknown as string,
  }).context,
  // instruction: populatedTemplate.result,
  instruction: input.persona,
  schema: {
    type: "object",
    properties: {
      summary: {
        type: "string",
        description: "the summary",
      },
    },
  },
});

const output = base.output({
  $metadata: {
    title: "Output",
  },
  // ...input,
});

generate.to(output);

const serialised = await input.serialize({
  title: "Filter Bot",
});

export { serialised as default, serialised as graph, input, output };

// export default await base
//   .input({
//     $metadata: {
//       title: "Input",
//       visual: {
//         // x: 0,
//         // y: 0,
//         collapsed: true,
//       },
//     },
//   }).to(base.output())
//   .serialize({ title: "Foo" });
