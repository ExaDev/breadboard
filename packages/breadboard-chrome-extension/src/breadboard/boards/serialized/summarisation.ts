import { addKit, base, board } from "@google-labs/breadboard";
import { ClaudeKit, template } from "../../kits/kits-as-code-node";
//import fs from "fs";
//import path from "path";

const messageSchema = {
  type: "string",
  title: "Message",
  description: "The text to summarise",
};

const claudeKeySchema = {
  type: "string",
  title: "apiKey",
  default: "",
  description: "The claude api key",
};

export const serializedClaudeBoard = await board(() => {
  const claudeKit = addKit(ClaudeKit);
  const inputs = base.input({
    $id: "inputs",
    schema: {
      title: "Claude summarisation",
      properties: {
        message: messageSchema,
        claudeKey: claudeKeySchema,
      },
    },
    type: "string",
  });

  const claudePostSummarisation = claudeKit.complete({
    $id: "claudePostSummarisation",
    model: "claude-2",
    url: "https://api.anthropic.com/v1/complete",
    apiKey: inputs.claudeKey as unknown as string,
  });

  const instructionTemplate = template({
    $id: "instructionTemplate",
    template: inputs.message as unknown as string,
  });

  instructionTemplate.string.as("userQuestion").to(claudePostSummarisation);
  const output = base.output({ $id: "output" });

  claudePostSummarisation.completion.to(output);
  claudePostSummarisation.status.to(output);

  return { output };
}).serialize({ title: "Summarisation board with claude" });

/* fs.writeFileSync(
  path.join(".", "/src/breadboard/graphs/claudeBoard.json"),
  JSON.stringify(serializedClaudeBoard, null, "\t")
); */
