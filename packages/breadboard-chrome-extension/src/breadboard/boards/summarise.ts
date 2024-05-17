import { base, board, OutputValues } from "@google-labs/breadboard";
import { complete, template } from "../kits/kits-as-code-node";

const claudeSummarisationBoard = board<
  {
    message: string;
    claudeKey: string;
  },
  OutputValues
>(({ message, claudeKey }) => {
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
  const output = base.output({ $id: "output" });

  claudePostSummarisation.completion.to(output);
  claudePostSummarisation.status.to(output);

  return output;
});

export { claudeSummarisationBoard };
export { claudeSummarisationBoard as default };
