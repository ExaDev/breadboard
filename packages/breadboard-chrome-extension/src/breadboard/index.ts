import { ClaudeKit } from "../kits/ClaudeKit";
import { StringKit } from "../kits/StringKit";
import { addKit, board } from "@google-labs/breadboard";

const myBoard = board<{ message: string, claudeKey: string }>(({ message, claudeKey }, { output }) => {
	const stringKit = addKit(StringKit);
	const claudeKit = addKit(ClaudeKit);

	console.log(message)
	console.log(claudeKey)

	const instructionTemplate = stringKit.template({
			$id: "instructionTemplate",
			template: message,
		}); 

	const claudePostSummarisation = claudeKit.complete({
		$id: "claudePostSummarisation",
		model: "claude-2",
		url: "http://localhost:5173/anthropic/v1/complete",
		apiKey: claudeKey
	});

	instructionTemplate.string.as("userQuestion").to(claudePostSummarisation);

	const summaryOutput = claudePostSummarisation.completion.to(output());
	console.log(summaryOutput)
	
	return summaryOutput;
});

export { myBoard };
export { myBoard as default };
