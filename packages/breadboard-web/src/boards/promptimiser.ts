import { Schema, base } from "@google-labs/breadboard";

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
      accepted: {
        type: "array",
        items: {
          type: "object",
        },
      },
      rejected: {
        type: "array",
        items: {
          type: "object",
        },
      },
    },
  } satisfies Schema,
});

// const prompt = input({
//   type: "string",
//   title: "Text",
//   description: "The text to output",
//   examples: ["Hello World"],
//   default: "Hello World",
// });

// const accepted = input({
//   type: array({
//     jsonSchema: {
//       type: "object",
//     },
//   }),
//   title: "Accepted",
//   description: "Accepted",
// });

// const rejected = input({
//   type: array({
//     jsonSchema: {
//       type: "object",
//     },
//   }),
//   title: "Rejected",
//   description: "Rejected",
// });

// const inputs = { prompt, accepted, rejected };

const output = base.output({
  $metadata: {
    title: "Output",
  },
  ...input,
});

// const inputA = input({});

// const output = base.output({
//   $metadata: {
//     title: "Output",
//   },
//   schema: {
//     type: "object",
//     properties: {},
//   } satisfies Schema,
// });

const serialised = await input.serialize({
  title: "Promptimiser",
});

export { serialised as graph, input, output };

export default serialised;
