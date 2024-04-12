import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { BoardRunner, createLoader, GraphDescriptor } from "@google-labs/breadboard";
import { is, validate } from "typia";

function isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
}
  
function isBGL(json: any): json is GraphDescriptor {
    const valid = is<GraphDescriptor>(json);
    if (!valid) {
        const validation = validate<GraphDescriptor>(json);
        console.debug({ validation });
    }
    return valid;
}
  
const app = new Hono();

app.get("/", (ctx) => ctx.text("Breadboard Invoker API"));
app.use(prettyJSON());
app.notFound((ctx) => ctx.json({ message: "Not Found", ok: false }, 404));

app.get("/board/:url", async (ctx) => {
  const { url }: any = ctx.req.param("url"); // TODO any?
  const inputs = ctx.req.queries();

  if (!isValidURL(url)) {
    const message = `Invalid URL: \`${url}\``;
    return ctx.json({
      status: 400,
      message: message,
    });
  }

  const json: Object = await fetch(url).then(
    async (response) => await response.json()
  );

  if (!isBGL(json)) {
		const message = `Invalid board:\n${url}`;
		return ctx.json({
      status: 400,
      message: message,
    });
	}

  const loader = createLoader();

  try {
    const graph = await loader.load(url, { base: url });

    if (!graph) {
      const message = `Board could not be loaded:\n${url}`;
      return ctx.json({
        status: 400,
        message: message,
      });
    }
    const runner = await BoardRunner.fromGraphDescriptor(graph);

    const boardRunnerOutput = runner.runOnce(inputs)

    const message = boardRunnerOutput;
    return ctx.json({
      status: 400,
      message: message,
    });
  } catch (err) {
    return ctx.json({
      status: 500,
      message: err ?? "An error occurred",
    });
  }
});

export default app;
export { app };