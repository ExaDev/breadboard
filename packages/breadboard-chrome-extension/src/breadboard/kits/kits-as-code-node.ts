import claude from "@anthropic-ai/tokenizer/claude.json" assert { type: "json" };
import { code, InputValues, OutputValues } from "@google-labs/breadboard";
import { Tiktoken, TiktokenBPE } from "js-tiktoken";
import { ClaudeParams, ClaudeResponse } from "../../kits/types/claude";
import { KitBuilder } from "@google-labs/breadboard/kits";

type TemplateInputValues = InputValues & { template: string };

export const template = code<TemplateInputValues>((inputs) => {
  const template = inputs.template;
  const matches = template.matchAll(/{{(?<name>[\w-]+)}}/g);
  const params = Array.from(matches).map((match) => match.groups?.name || "");
  const parameters = Array.from(new Set(params));

  if (!parameters.length) return { string: template };

  const substitutes = parameters.reduce((acc, parameter) => {
    if (inputs[parameter] === undefined)
      throw new Error(`Input is missing parameter "${parameter}"`);
    return { ...acc, [parameter]: inputs[parameter] };
  }, {});

  const stringify = (value: unknown): string => {
    if (typeof value === "string") return value;
    if (value === undefined) return "undefined";
    return JSON.stringify(value, null, 2);
  };

  const substitute = (template: string, values: InputValues) => {
    const reduced = Object.entries(values).reduce(
      (acc, [key, value]) => acc.replace(`{{${key}}}`, stringify(value)),
      template
    );
    return { reduced };
  };

  const string = substitute(template, substitutes);

  return Promise.resolve({ string });
});

const postClaudeCompletion = code<ClaudeParams>(
  async ({
    apiKey,
    model,
    userQuestion,
    maxTokens,
    stopSequences,
    temperature,
    topP,
    topK,
    stream,
    url,
  }): Promise<ClaudeResponse> => {
    if (!apiKey) throw new Error("Missing apiKey");
    if (!userQuestion) throw new Error("Missing userQuestion");
    model = model || "claude-2";
    // Endpoint URL
    url = url || "https://api.anthropic.com/v1/complete";
    // Request headers
    const headers = {
      accept: "application/json",
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
      "x-api-key": apiKey,
    };

    // Constructing the prompt
    const prompt = `\n\nHuman: Shorten the discussion regarding this post in less than the original number of words: ${userQuestion}\n\nAssistant:`; //make this bit as user input and allow users to tell claude what they'd like to do with the selected text
    const tiktokenBPE: TiktokenBPE = {
      pat_str: claude.pat_str,
      special_tokens: claude.special_tokens,
      bpe_ranks: claude.bpe_ranks,
    };
    const tokenizer = new Tiktoken(tiktokenBPE);
    const encoded = tokenizer.encode(prompt.normalize("NFKC"));
    const inputTokenCount = encoded.length;
    const TOKEN_LIMIT = 100000;
    maxTokens = maxTokens || TOKEN_LIMIT - inputTokenCount;
    if (maxTokens < 0)
      throw new Error(
        `input token count ${inputTokenCount} exceeds token limit ${TOKEN_LIMIT}!`
      );

    // Request body
    const body = {
      model,
      prompt,
      max_tokens_to_sample: maxTokens,
      ...(stopSequences && { stop_sequences: stopSequences }),
      ...(temperature !== undefined && { temperature }),
      ...(topP !== undefined && { top_p: topP }),
      ...(topK !== undefined && { top_k: topK }),
      ...(stream !== undefined && { metadata: { stream } }),
    };

    let claudeResponse = {} as ClaudeResponse;
    try {
      claudeResponse.status = "pending";
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok)
        throw new Error(
          `HTTP error! status: ${response.status}:${response.statusText}`
        );
      claudeResponse = (await response.json()) as ClaudeResponse;
      claudeResponse.status = "finished";
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
    return claudeResponse;
  }
);

export const ClaudeKit = new KitBuilder({
  url: "npm:@exadev/breadboard-kits/Claude",
}).build({
  async complete(input: InputValues): Promise<OutputValues> {
    return postClaudeCompletion(
      input as ClaudeParams
    ) as unknown as OutputValues;
  },
});
