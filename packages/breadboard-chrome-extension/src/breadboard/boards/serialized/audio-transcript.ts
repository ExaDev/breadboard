import { base, board, code, Schema } from "@google-labs/breadboard";
import fs from "fs";
import path from "path";

const audioBlobSchema = {
  type: "object",
  title: "inputs",
  format: "audio-file",
  description: "The audio file to transcribe as Blob",
} satisfies Schema;

const keySchema = {
  type: "string",
  title: "apiKey",
  default: "myKey",
  description: "The hugging face api key",
};

/* const convertBlobToBuffer = code<{ blob: Blob }>(async (data) => {
  const { blob } = data;
  const arrayBuffer = await blob.arrayBuffer(); //put this and the line below into a separate code node that converts a blob to a buffer?
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
}); */

const transcribeFile = code<{ data: Blob; apiKey: string }>(async (input) => {
  const { data, apiKey } = input;
  const arrayBuffer = await data.arrayBuffer(); //put this and the line below into a separate code node that converts a blob to a buffer?
  const buffer = Buffer.from(arrayBuffer);
  //const buffer = convertBlobToBuffer({ blob: data});

  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/wav2vec2-base-960h",
    {
      headers: { Authorization: `Bearer ${apiKey}` },
      method: "POST",
      body: buffer,
    }
  );
  const result = await response.json();
  return { result };
});

export const huggingFaceAudioTranscript = await board(() => {
  const inputs = base.input({
    $id: "query",
    schema: {
      title: "Hugging Face Schema For Audio Transcript",
      properties: {
        data: audioBlobSchema,
        apiKey: keySchema,
      },
    },
    type: "string",
  });

  const output = base.output({ $id: "main" });

  const { result } = transcribeFile({
    data: inputs.data as unknown as Blob,
    apiKey: inputs.apiKey as unknown as string,
  });

  result.to(output);
  return { output };
}).serialize({
  title: "AudioTranscriptBoard",
  description: "Breadboard for generating transcript from audio file",
});

fs.writeFileSync(
  path.join(".", "/src/breadboard/graphs/AudioTranscriptBoard.json"),
  JSON.stringify(huggingFaceAudioTranscript, null, "\t")
);
