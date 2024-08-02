import {
    annotate,
    board,
    enumeration,
    input,
    object,
    output,

} from "@breadboard-ai/build";
import { geminiText } from "@google-labs/gemini-kit";


const picture = input({
    title: "Image", type: annotate(object({
        format: enumeration("image-drawable", "image-drawable"),
    }), {
        behavior: ["llm-content"],
    })
})

const modelInput = input({
    type: enumeration("gemini-1.5-flash-latest", "gemini-1.5-pro-latest")
  });

const prompt = input({ title: "Prompt", type: "string" })

const llmResponse = geminiText({
    text: "unused",
    context: picture,
    model: modelInput,
    systemInstruction: prompt,
});

export default board({
    title: "Drawable New Syntax",
    description: "Drawable New Syntax",
    version: "0.1.0",
    inputs: { picture, prompt, modelInput },
    outputs: {
        text: output(llmResponse.outputs.text),
    },
});