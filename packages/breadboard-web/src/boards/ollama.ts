import { board, base, code } from "@google-labs/breadboard";
import { core } from "@google-labs/core-kit";
import { makeFiles } from "../../util/merMake.js";

type OllamaRequest = {
    model: string 
    prompt: string
    stream: boolean
}

const modelSchema = {
    type: "string",
    title: "Ollama Model",
    default: "llama3",
    description: "The Ollama model to respond to the prompt"
}

const promptSchema = {
    type: "string",
    title: "Prompt",
    default: "What are the continents called?",
    description: "Prompt to ask Ollama Model"
}


const buildRequest = code<{ model: string, prompt: string, stream: boolean}>((input) => {
    const payload: OllamaRequest = input

    console.log("payload", payload)

    return { payload }
});

// this assumes Ollama is running on localhost:1234
// board has been tested with Llama3, Phi3, Mistral and Gemma
// simply change the "model" input to select the desired model
// CHANGE URL TO JUST HTTP://LOCALHOST:11434 IF RUNNING OUTSIDE OF A DEV CONTAINER
export default await board(() => {
    const inputs = base.input({
        $id: "query",
        schema: {
            title: "Inputs for Ollama3 API call",
            properties: {
                model: modelSchema,
                prompt: promptSchema,
            },
        },
        type: "string",
    });

    const url = "http://localhost:11434/api/generate"
    const output = base.output({ $id: "main" });

    const { payload } = buildRequest({
        model: inputs.model.isString(),
        prompt: inputs.prompt.isString(),
        stream: false,
    })

    const response = core.fetch({
        headers: { "content-type": "application/json" },
        method: "POST",
        body: payload,
        url: url
    });

    response.to(output);
    return { output }
}).serialize({
    title: "Ollama Proxy",
    description: "Board which interacts with local Ollama",
    version: "0.0.1",
  });
  
