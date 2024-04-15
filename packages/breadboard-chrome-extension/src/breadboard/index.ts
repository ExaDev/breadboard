import { board } from "@google-labs/breadboard";
import { complete, template } from "./kits-as-code-node";

const myBoard = board<{ message: string; claudeKey: string }>(
  ({ message, claudeKey }, { output }) => {
    const instructionTemplate = template({
      $id: "instructionTemplate",
      template: message,
    });

    const claudePostSummarisation = complete({
      $id: "claudePostSummarisation",
      model: "claude-2",
      url: "http://localhost:5173/anthropic/v1/complete",
      apiKey: claudeKey,
    });

    instructionTemplate.string.as("userQuestion").to(claudePostSummarisation);

    const summaryOutput = claudePostSummarisation.completion.to(output());

    return summaryOutput;
  }
);

export { myBoard };
export { myBoard as default };
