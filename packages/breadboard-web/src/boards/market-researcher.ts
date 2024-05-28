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
// const finalOutput = base.output({
//   $id: "finalOutput",
// });
const output = base.output({
  $id: "output",
  //   schema: {
  //     title: "Search Results",
  //   },
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

// const items = response.items;
// response.items.to(base.output()).to(finalOutput);

// const pop = <T extends NodeValue>() =>
//   code<{ items: T[] }, { item: T; items: T[] }>((inputs) => ({
//     item: inputs.items.pop() as T,
//     items: inputs.items,
//   }));

// const genericPop = <T>() =>
//   code<{ items: T[] }, { item?: T; items?: T[] }>((inputs) => {
//     const items = inputs.items;
//     const item = items.pop();
//     // return {
//     //   item: item as T,
//     //   items,
//     // };
//     if (item) {
//       // throw new Error("No more items to pop");
//       return {
//         item,
//         items,
//       };
//     }
//   });

const shiftItem = shift({
  $id: "shiftItem",
  items: response.items,
});

// shiftItem.item.to(base.output({
//   $id: "shiftItemOutput"
// })).to(finalOutput);

// const urlInput = base.input({
//   $id: "initialUrl",
//   schema: {
//     description: "Search for something on the web",
//     type: "object",
//     properties: {
//       url: {
//         type: "string",
//         description: "What would you like to search for?",
//         default: "https://breadboard-ai.github.io/breadboard/",
//       },
//     },
//   },
// });
// items.to(popItem);
// response.to(output)
// search.to(output)

// const openAiBaseUrl = base.input({
//   $id: "openAiBaseUrl",
//   schema: {
//     type: "object",
//     properties: {
//       url: {
//         type: "string",
//         description: "The URL of the OpenAI API",
//         // default: "https://api.openai.com/v1",
//         default: "http://mbp-m3.turtle-frog.ts.net:1234/v1",
//       },
//     },
//   },
// });

// const completionsUrl = templates.urlTemplate({
//   $id: "completionsUrl",
//   url: openAiBaseUrl.url,
//   template: "{url}/chat/completions",
// });
// const fetchPage = core.fetch({
//   $id: "fetchPage",
//   // url: completionsUrl.url,
//   // url: urlInput.url
// });
// // urlInput.url.to(fetchPage);

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
        description: "The URL of the OpenAI API",
        default: "https://api.openai.com/v1",
      },
      model: {
        type: "string",
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
// shiftItem.item.as("content").to(request);
// shiftItem.item.to(output)
const firstResult = spread({
  $id: "firstSearchResult",
  object: shiftItem.item,
});
firstResult.to(output);
// firstResult.link.to(fetchPage)
// const firstPageContent = core.fetch({
//   url: firstResult.link as unknown as string,
// });
const fetchPage = core.fetch({
  url: firstResult.link as unknown as string,
});
// firstResult.to(output)
// firstResult.link.as("url").to(fetchPage);
// fetchPage.response.to(output);
// const firstPageContent = fetchPage.response.as("content").to(request);
const firstPageContent = fetchPage.response;
// const xmlExtractor = code<{ content: string }, { content: string }>(
//   (inputs) => {
//     // parse the html
//   }
// );
// request;

// firstPageContent.response.to(output);

request.to(output);

// request.to(base.output({
//   $id: "requestOutput",
// })).to(finalOutput);
// openAiBaseUrl.url.to(request);

// request.to(output);
const fetchCompletion = core.fetch({
  $id: "callOpenAI",
  url: request.url,
  method: "POST",
  headers: request.headers,
  body: request.body,
});
// fetchCompletion.response.to(output);
// fetchCompletion.to(base.output({
//   $id: "fetchCompletionOutput",
// })).to(finalOutput);

// fetchPage.response.to(base.output({
//   $id: "fetchPageOutput",
// })).to(finalOutput);
// fetchPage.response.as("content").to(buildRequest);

export default await output.serialize({
  title: "Market Researcher",
});
