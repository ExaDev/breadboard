import { OutputValues, base, code } from "@google-labs/breadboard";
import { core } from "@google-labs/core-kit";
import { gemini } from "@google-labs/gemini-kit";
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
>((inputs) => ({
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
}));

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

const firstResult = spread({
  $id: "firstSearchResult",
  object: shiftItem.item,
});
// shiftItem.item.as("content").to(request);
// firstResult.to(output);
// const pageFetcher = code<
//   {
//     url: string;
//     method?: "GET" | "POST" | "PUT" | "DELETE";
//     headers?: HeadersInit;
//     body?: BodyInit;
//   },
//   {
//     status: number;
//     body: string | object;
//   }
// >(async (inputs) => {
//   console.log(inputs.url);
//   const requestInit: RequestInit = {
//     method: inputs.method || "GET",
//     headers: inputs.headers || undefined,
//     // body: inputs.method === "GET" ? undefined : JSON.stringify({}),
//     body: inputs.body || undefined,
//   };
//   const response: Response = await fetch(inputs.url, requestInit);
//   let body
//   if (response.headers.get("Content-Type")?.includes("application/json")) {
//     body = await response.json()
//   } else {
//     body = await response.text()
//   }

//   const output = {
//     status: response.status,
//     body: body,
//     // json: response.headers.get("Content-Type")?.includes("application/json")
//     //   ? await response.json()
//     //   : undefined,
//   };
//   console.log(output);
//   return new Promise((resolve) => resolve(output));
// });

// const fetchPage = pageFetcher({
//   url: firstResult.link as unknown as string,
// });

const fetchPage = core.fetch({
  $id: "fetchPage",
  url: firstResult.link as unknown as string,
  method: "GET",
});
// firstResult.link.as("url").to(fetchPage);
// fetchPage.response.to(output);

// const fetchCompletion = core.fetch({
//   $id: "callOpenAI",
//   url: request.url,
//   method: "POST",
//   headers: request.headers,
//   body: request.body,
// });
// const completionResponse = spread({
//   $id: "spreadCompletionResponse",
//   object: fetchCompletion.response,
// });
// const choices = completionResponse.choices;
// const shiftChocies = shift({
//   $id: "shiftChoice",
//   items: choices,
// });
// const completionItem = spread({
//   $id: "spreadCompletionItem",
//   object: shiftChocies.item,
// });
// const messageContent = spread({
//   $id: "spreadMessageContent",
//   object: completionItem.message,
// });
// messageContent.content.to(output);

const articlesFromHtml = code<
  {
    html: string;
  },
  {
    articles: string[];
  }
>((inputs) => {
  const html = inputs.html;
  const strippedHtml = html
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "")
    .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, "");
  // Extract the body content
  const bodyMatch = strippedHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : strippedHtml;
  const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/gi;
  const articleMatches = bodyContent.match(articleRegex);
  const articles = articleMatches || [];
  return { articles };
});

const HtmlToMarkdown = code<
  {
    html: string;
  },
  OutputValues
>((inputs) => {
  //////////////////////////////////////////////////////////////////////////////
  // Strip out script and style content
  const html = inputs.html;
  const strippedHtml = html
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "")
    .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, "");

  // Conversion rules
  const rules: { [key: string]: { regex: RegExp; replace: string } } = {
    heading1: { regex: /<h1[^>]*>([\s\S]*?)<\/h1>/gi, replace: "# $1\n\n" },
    heading2: { regex: /<h2[^>]*>([\s\S]*?)<\/h2>/gi, replace: "## $1\n\n" },
    heading3: { regex: /<h3[^>]*>([\s\S]*?)<\/h3>/gi, replace: "### $1\n\n" },
    bold: {
      regex: /<b[^>]*>([\s\S]*?)<\/b>|<strong[^>]*>([\s\S]*?)<\/strong>/gi,
      replace: "**$1$2**",
    },
    italic: {
      regex: /<i[^>]*>([\s\S]*?)<\/i>|<em[^>]*>([\s\S]*?)<\/em>/gi,
      replace: "*$1$2*",
    },
    link: {
      regex: /<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,
      replace: "[$2]($1)",
    },
    listItem: { regex: /<li[^>]*>([\s\S]*?)<\/li>/gi, replace: "- $1" },
    unorderedList: { regex: /<ul[^>]*>([\s\S]*?)<\/ul>/gi, replace: "$1\n" },
    orderedList: { regex: /<ol[^>]*>([\s\S]*?)<\/ol>/gi, replace: "$1\n" },
    paragraph: { regex: /<p[^>]*>([\s\S]*?)<\/p>/gi, replace: "$1\n\n" },
    lineBreak: { regex: /<br\s*\/?>/gi, replace: "\n" },
  };

  // Apply the conversion rules
  let markdown = strippedHtml;
  for (const rule in rules) {
    if (Object.prototype.hasOwnProperty.call(rules, rule)) {
      markdown = markdown.replace(rules[rule].regex, rules[rule].replace);
    }
  }

  // Remove any remaining HTML tags
  markdown = markdown.replace(/<[^>]+>/g, "");

  // decode and replace HTML entities
  // &nbsp; to space
  markdown = markdown.replace(/&nbsp;/g, " ");
  // &amp; to ampersand
  markdown = markdown.replace(/&amp;/g, "&");
  // &quot; to double quote
  markdown = markdown.replace(/&quot;/g, '"');
  // &lt; to less than
  markdown = markdown.replace(/&lt;/g, "<");
  // &gt; to greater than
  markdown = markdown.replace(/&gt;/g, ">");
  // &#8211; to en dash
  markdown = markdown.replace(/&#8211;/g, "–");
  // &#8217; to apostrophe
  markdown = markdown.replace(/&#8217;/g, "'");
  // &#8230; to ellipsis
  markdown = markdown.replace(/&#8230;/g, "…");
  // &#8220; to left double quote
  markdown = markdown.replace(/&#8220;/g, "“");
  // &#8221; to right double quote
  markdown = markdown.replace(/&#8221;/g, "”");
  // &#8212; to em dash
  markdown = markdown.replace(/&#8212;/g, "—");
  // &#160; to non-breaking space
  markdown = markdown.replace(/&#160;/g, " ");

  // Clean up extra whitespace
  markdown = markdown.replace(/\n{2,}/g, "\n\n").trim();

  // clean up extra spaces (except newlines) that are not at the start of a line
  markdown = markdown.replace(/(?<!\n)\s{2,}/g, " ");

  return { markdown };
  //////////////////////////////////////////////////////////////////////////////
});

const markdown = HtmlToMarkdown({
  $id: "htmlToMarkdown",
  html: fetchPage.response,
});

// html.to(output);

// markdown.markdown.as("content").to(request);
const Push = code<
  {
    array?: unknown[];
    item: unknown;
  },
  {
    array: unknown[];
  }
>((inputs) => {
  const array = inputs.array || [];
  array.push(inputs.item);
  return { array };
});

const push = Push({
  items: markdown.markdown,
});

type ContextRole = "user" | "system";

type ContextPart = {
  text: string;
};

type ContextParts = ContextPart[];

type ContextItem = {
  role: ContextRole;
  parts: ContextParts;
};

type Context = ContextItem[];

const AppendContext = code<
  {
    role: ContextRole;
    parts: string | string[];
    context?: Context;
  },
  {
    context: Context;
  }
>((inputs) => {
  const context: Context = inputs.context || [];
  const parts: ContextParts = Array.isArray(inputs.parts)
    ? inputs.parts.map((text) => ({ text }))
    : [{ text: inputs.parts }];
  context.push({ role: inputs.role, parts });
  return { context };
});

const geminiCompletion = gemini.text({
  stream: true,
  model: "gemini-1.5-pro-latest",
  // text: config.prompt,
  instruction: config.prompt,
  context: AppendContext({
    $id: "appendContext",
    role: "user",
    parts: markdown.markdown as unknown as string,
  }),
});
geminiCompletion.to(output);

export default await output.serialize({
  title: "Market Researcher",
});
