import { board, code, InputValues } from "@google-labs/breadboard";

const xenovaPipe = code<InputValues & { message: string }>(
  async ({ message }) => {
    const task = "sentiment-analysis";
    const model = "Xenova/bert-base-multilingual-uncased-sentiment";
    const output = await import("@xenova/transformers").then(async (xenova) => {
      const pipe = await xenova.pipeline(task, model);

      return await pipe(message as string);
    });
    return { output };
  }
);

const sentimentAnalysisBoard = board<{ message: string }>(({ message }) => {
  const { output } = xenovaPipe(message);
  return { output };
});

export { sentimentAnalysisBoard };
export { sentimentAnalysisBoard as default };
