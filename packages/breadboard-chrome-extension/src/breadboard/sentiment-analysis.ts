import { board, code, InputValues } from "@google-labs/breadboard";
import { pipeline, env } from "@xenova/transformers";

const xenovaPipe = code<InputValues & { message: string }>(
  async ({ message }) => {
    env.allowRemoteModels = false;
    env.allowLocalModels = true;
    const task = "sentiment-analysis";
    const model = "Xenova/bert-base-multilingual-uncased-sentiment";
    const output = async () => {
      const pipe = await pipeline(task, model);

      return await pipe(message as string);
    };
    return { output };
  }
);

const sentimentAnalysisBoard = board<{ message: string }>(
  ({ message }, { output }) => {
    const xenovaAnalysis = xenovaPipe(message);
    const xenovaOutput = xenovaAnalysis.output.to(output());
    return xenovaOutput;
  }
);

export { sentimentAnalysisBoard };
export { sentimentAnalysisBoard as default };
