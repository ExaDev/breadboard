import { board } from "@google-labs/breadboard";
import { complete, template } from "./kits-as-code-node";

const claudeSummarisationBoard = board<{
  message: string;
  claudeKey: string;
}>(({ message, claudeKey }, { output }) => {
  const instructionTemplate = template({
    $id: "instructionTemplate",
    template: message,
  });

  const claudePostSummarisation = complete({
    $id: "claudePostSummarisation",
    model: "claude-2",
    url: "https://api.anthropic.com/v1/complete",
    apiKey: claudeKey,
  });

  instructionTemplate.string.as("userQuestion").to(claudePostSummarisation);

  const summaryOutput = claudePostSummarisation.completion.to(output());
  claudePostSummarisation.status.to(summaryOutput);

  return summaryOutput;
});

export { claudeSummarisationBoard };
export { claudeSummarisationBoard as default };
