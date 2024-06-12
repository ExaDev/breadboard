/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { agents } from "@google-labs/agent-kit";
import { Schema, base, code } from "@google-labs/breadboard";
import { Context, LlmContentRole } from "../../../agent-kit/dist/src/context";

export const task = [
  `You are tasked with assisting by generating thoughtful, engaging, and professional responses to customer reviews. Your purpose is to process reviews from various sources and generate replies that maintain the brand's voice. Here are the detailed instructions for generating replies:`,
  ``,
  `1. **Input Analysis:**`,
  ` - Extract key points from the customer review, identifying positive feedback, concerns, and suggestions.`,
  ` - Recognise the customer's sentiment and tailor your response accordingly.`,
  ``,
  `2. **Structure:**`,
  ` - Start with a greeting and address the reviewer by name if available.`,
  ` - Thank the customer for their feedback.`,
  ` - Address the key points raised in the review.`,
  ` - Conclude with an invitation for further engagement or a thank you note.`,
  ``,
  `3. **Brand Voice:**`,
  ` - Maintain a consistent brand voice that aligns with the values and identity.`,
  ` - Avoid jargon or overly technical language unless typically communicated in such a manner.`,
].join("\n");

export const tone = [
  `## General Tone Guidelines`,
  `- The tone should be friendly, appreciative, and professional.`,
  `- Avoid mentioning or implying that the response was generated by a system or software. Maintain a natural and human-like tone throughout the replies.`,
].join("\n");

export const voice = [
  `## Specific Tone Guidelines:`,
  `### Tone description:`,
  ``,
  `The aim is for a warm, welcoming, and slightly informal tone. Value personal connections and strive to make every customer feel like a valued guest.`,
  ``,
  `### Positive Review:`,
  ``,
  `- Express gratitude and highlight the specific compliments mentioned.`,
  `- Example:`,
  ` - Customer Review: “I had a fantastic experience. The food was delicious, and the service was top-notch!”`,
  ` - Reply: “Hi [Customer Name], thank you so much for your kind words! We are thrilled to hear that you enjoyed our food and service. Your feedback means a lot to us, and we look forward to welcoming you back soon!”`,
  ``,
  `### Negative Review:`,
  ``,
  `- Show empathy, apologise for any shortcomings, and offer solutions or steps taken to address the issue.`,
  `- Example:`,
  ` - Customer Review: “The waiting time was too long, and my order was incorrect.”`,
  ` - Reply: “Hi [Customer Name], we are very sorry to hear about your experience. We strive to provide prompt and accurate service, and it seems we fell short this time. Please reach out to us directly at [contact information] so we can make it right. Thank you for bringing this to our attention.”`,
  ``,
  `### Neutral Review:`,
  ``,
  `- Acknowledge the feedback, thank the customer, and mention any improvements or features that might interest them.`,
  `- Example:`,
  ` - Customer Review: “The coffee was good, but the seating area could be improved.”`,
  ` - Reply: “Hi [Customer Name], thank you for your feedback. We’re glad you enjoyed the coffee and appreciate your suggestions regarding the seating area. We’re always looking for ways to enhance our customers’ experience and will take your comments into consideration. We hope to see you again soon!”`,
].join("\n");

export const taskSchema: Schema = {
  type: "string",
  title: "Task",
  format: "multiline",
  default: task,
  description: "Task description and instructions",
};

export const toneSchema: Schema = {
  type: "string",
  title: "Tone",
  description: "General tone guidelines",
  default: tone,
  format: "multiline",
};

export const voiceSchema: Schema = {
  type: "string",
  title: "Voice",
  description: "Business-specific tone guidelines",
  default: voice,
  format: "multiline",
};

export const reviewSchema: Schema = {
  type: "string",
  title: "Review",
  // default: "",
  // default: defaultReview,
  format: "multiline",
};

export const inputSchema = {
  type: "object",
  properties: {
    task: taskSchema,
    tone: toneSchema,
    voice: voiceSchema,
    review: reviewSchema,
  },
  required: ["task", "tone", "voice", "review"],
};

const input = base.input({
  $metadata: {
    title: "Input",
  },
  schema: inputSchema,
});

type ContextMakerNodeInput = {
  role?: LlmContentRole;
  text: string;
};

const contextPartMaker = code<ContextMakerNodeInput, { context: Context }>(
  (inputs: ContextMakerNodeInput) => {
    const parts = [{ text: inputs.text }];
    return {
      context: inputs.role ? { role: inputs.role, parts } : { parts },
    };
  }
);

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
>(({ a, b, delimiter = " " }: JoinStringNodeInput): { result: string } => {
  return { result: a + delimiter + b };
});

const persona = joinString({
  $metadata: {
    title: "Persona",
  },
  a: input.tone as unknown as string,
  b: input.voice as unknown as string,
  delimiter: "\n\n",
});

const makePersonaContext = contextPartMaker({
  $metadata: {
    title: "Make persona context",
  },
  text: persona.result,
});

const makeReviewContext = contextPartMaker({
  $metadata: {
    title: "Make review context",
  },
  text: input.review as unknown as string,
  role: "user",
});

const bot = agents.specialist({
  $metadata: { title: "Chat Bot" },
  in: makeReviewContext.context,
  persona: makePersonaContext.context,
  task: input.task,
  model: "gemini-1.5-flash-latest",
});

const output = base.output({
  $metadata: {
    title: "Output",
  },
  schema: {
    type: "object",
    properties: {
      review: {
        type: "string",
        title: "Review",
      },
      reply: {
        type: "string",
        title: "Reply",
      },
    },
  } satisfies Schema,
});

bot.out.as("reply").to(output);
// coalesceReview.item.as("review").to(output);

const serialised = await input.serialize({
  title: "Bussiness Review Reply Generator",
  description: "A board that generates a reply to a business review.",
});

export { serialised as graph, input, output };

export default serialised;
