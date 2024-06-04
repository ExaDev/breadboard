import { base, code } from "@google-labs/breadboard";
import { core } from "@google-labs/core-kit";
import { templates } from "@google-labs/template-kit";
import { shift } from "../utils/shift";
import { spread } from "../utils/spread";

const input = base.input({
  $id: "query",
  schema: {
    description: "Search for something on the web",
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "What would you like to search for?",
        default: "Google Breadboard",
      },
    },
    required: ["query"],
  },
});
const output = base.output({
  $id: "output",
});

const secrets = core.secrets({
  $id: "secrets",
  keys: ["CSE_API_KEY", "CSE_ID", "OPEN_AI_API_KEY"],
});

const cseURL = templates.urlTemplate({
  $id: "customSearchURL",
  CSE_ID: secrets.CSE_ID,
  CSE_API_KEY: secrets.CSE_API_KEY,
  QUERY: input.query,
  template:
    "https://customsearch.googleapis.com/customsearch/v1?key={CSE_API_KEY}&cx={CSE_ID}&q={QUERY}",
});

const search = core.fetch({
  $id: "searchResult",
  url: cseURL.url,
});

const response = spread({
  $id: "spreadResponse",
  object: search.response,
});

const shiftItem = shift({
  $id: "shiftItem",
  items: response.items,
});

const buildRequest = code<
  {
    content: string;
    OPEN_AI_API_KEY: string;
    model: string;
    temperature: number;
    url: string;
    prompt: string;
  },
  { headers: object; body: object; url: string }
>((inputs) => {
  return {
    body: {
      model: inputs.model,
      messages: [
        {
          role: "user",
          content: [inputs.prompt, JSON.stringify(inputs.content)].join("\n"),
        },
      ],
      temperature: inputs.temperature,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${inputs.OPEN_AI_API_KEY}`,
    },
    url: `${inputs.url}/chat/completions`,
  };
});

const config = base.input({
  $id: "config",
  schema: {
    type: "object",
    required: ["url", "model", "temperature", "prompt"],
    properties: {
      url: {
        type: "string",
        title: "OpenAI API URL",
        description: "The URL of the OpenAI API",

        default: "http://mbp-m3.turtle-frog.ts.net:1234/v1",
        examples: ["https://api.openai.com/v1", "http://localhost:1234/v1"],
      },
      model: {
        type: "string",
        title: "Model",
        description: "The model to use",
        default: "gpt-3.5-turbo-1106",
      },
      temperature: {
        type: "number",
        description: "The temperature to use",
        default: "0.7",
      },
      prompt: {
        type: "string",
        title: "Prompt",
        description: "The prompt to use",
        default: "Describe the product shown on the following page.",
      },
    },
  },
});
const request = buildRequest({
  $id: "buildRequest",
});

secrets.OPEN_AI_API_KEY.to(request);
config.url.to(request);
config.model.to(request);
config.temperature.to(request);
config.prompt.to(request);
//
const firstResult = spread({
  $id: "firstSearchResult",
  object: shiftItem.item,
});
shiftItem.item.as("content").to(request);
firstResult.to(output);
const fetchPage = core.fetch({
  $id: "fetchPageContent",
  url: firstResult.link as unknown as string,
});
fetchPage.response.to(output);




const fetchCompletion = core.fetch({
  $id: "callOpenAI",
  url: request.url,
  method: "POST",
  headers: request.headers,
  body: request.body,
});
const completionResponse = spread({
  $id: "spreadCompletionResponse",
  object: fetchCompletion.response,
});
const choices = completionResponse.choices;
const shiftChocies = shift({
  $id: "shiftChoice",
  items: choices,
});
const completionItem = spread({
  $id: "spreadCompletionItem",
  object: shiftChocies.item,
});
const messageContent = spread({
  $id: "spreadMessageContent",
  object: completionItem.message,
});
messageContent.content.to(output);


export default await output.serialize({
  title: "Market Researcher",
});
