import {
  BoardRunner,
  Edge,
  GraphDescriptor,
  InputValues,
  Node,
  NodeHandlerContext,
  OutputValues,
  asRuntimeKit,
  createLoader,
} from "@google-labs/breadboard";
import { Core } from "@google-labs/core-kit";
import { TemplateKit } from "@google-labs/template-kit";
import express from "express";
import { ParamsDictionary, Request, Response } from "express-serve-static-core";

const expressApp = express();

expressApp.get(
  "/api",
  async (
    req: { path: string },
    res: Response<any, Record<string, any>, number>
  ) => {
    try {
      return returnTimestamp(res, "/api", req.path);
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

function returnTimestamp(
  res: Response<any, Record<string, any>, number>,
  path: string,
  reqPath: string
) {
  return res
    .status(200)
    .send(`${path} -> ${reqPath}:\t${new Date().toISOString()}`);
}

function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

function isNode(obj: any): obj is Node<InputValues, OutputValues> {
  return (
    obj &&
    typeof obj == "object" &&
    "id" in obj &&
    "type" in obj &&
    "configuration" in obj
  );
}

function isNodeArray(obj: any): obj is Node<InputValues, OutputValues>[] {
  return typeof obj == "object" && Array.isArray(obj) && obj.every(isNode);
}

function isEdge(obj: any): obj is Edge {
  return (
    obj &&
    typeof obj == "object" &&
    "from" in obj &&
    "to" in obj &&
    "in" in obj &&
    "out" in obj
  );
}
function isEdgeArray(obj: any): obj is Edge[] {
  return typeof obj == "object" && Array.isArray(obj) && obj.every(isEdge);
}

function isBGL(json: any): json is GraphDescriptor {
  if (typeof json !== "object") {
    return false;
  }
  if (json === null) {
    return false;
  }
  if (Array.isArray(json)) {
    return false;
  }
  if (!isNodeArray(json.nodes)) {
    return false;
  }
  if (!isEdgeArray(json.edges)) {
    return false;
  }
  return true;
}

expressApp.use(express.json());

expressApp.get("/status", async (req, res) => {
  res.json({
    status: "ok",
  });
});

expressApp.get("/", (req: any, res: { send: (arg0: string) => any }) =>
  res.send("Breadboard Invoker API")
);

type ExpressRequest<P extends ParamsDictionary = any> = Request<
  P,
  any,
  any,
  any,
  Record<string, any>
>;
type ExpressResponse = Response<any, Record<string, any>, number>;

expressApp.get(
  "*",
  async (
    req: ExpressRequest,
    res: ExpressResponse
  ): Promise<ExpressResponse> => {
    const params: object = req.params;
    const paramsArray: string[] = Object.values(params);

    if (paramsArray.length == 0 || paramsArray.length > 1) {
      res.status(400).send("Bad Request");
    }

    const firstParam = paramsArray[0];
    const url = firstParam.startsWith("/")
      ? firstParam.substring(1)
      : firstParam;

    if (!isValidURL(url)) {
      return res.status(400).json({
        message: `Invalid URL: \`${url}\``,
      });
    }

    try {
      const response = await fetch(url);
      const json = await response.json();
      if (!isBGL(json)) {
        return res.status(400).json({
          message: `Invalid board: ${url}`,
        });
      }
      const loader = createLoader();
      const graph = await loader.load(url, { base: new URL(url) });

      if (!graph) {
        return res.status(400).json({
          message: `Board could not be loaded: ${url}`,
        });
      }
      const kits = [asRuntimeKit(Core), asRuntimeKit(TemplateKit)];

      const runner: BoardRunner = await BoardRunner.fromGraphDescriptor(graph);

      const inputs = req.params;
      const context: NodeHandlerContext = {
        kits,
      };
      const boardRunnerOutput = await runner.runOnce(inputs, context);

      return res.json({
        result: boardRunnerOutput,
        inputs,
        board: graph,
      });
    } catch (e: any) {
      return res.status(500).json({
        message: e.message || "An error occurred",
      });
    }
  }
);

// export const app = https.onRequest(expressApp);
export { expressApp };
