import {
  BoardRunner,
  NodeHandlerContext,
  RunResult,
  asRuntimeKit,
  createLoader,
} from "@google-labs/breadboard";
import { Core } from "@google-labs/core-kit";
import { TemplateKit } from "@google-labs/template-kit";
import { randomUUID } from "crypto";
import express from "express";
import { ParamsDictionary, Request, Response } from "express-serve-static-core";

export function returnTimestamp(
  res: Response<any, Record<string, any>, number>,
  path: string,
  reqPath: string
) {
  return res
    .status(200)
    .send(`${path} -> ${reqPath}:\t${new Date().toISOString()}`);
}

// const datastore = new Datastore();
import { Firestore } from "@google-cloud/firestore";
import { isBGL } from "./isBGL.js";
import { isValidURL } from "./isValidURL.js";
// create firestore instance
const db = new Firestore();
const sessions = db.collection("SessionState");
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

// Helper function to save state to Google Cloud Datastore
async function saveState(state: RunResult) {
  const sessionId = randomUUID();
  // const key = datastore.key(["SessionState", sessionId]);
  const key = sessions.doc(sessionId);
  const entity = {
    key: key,
    data: JSON.parse(JSON.stringify(state)),
    stringified: JSON.stringify(state),
  };
  await key.set(entity);
  return sessionId;
}

// Helper function to get state from Google Cloud Datastore
async function getState(sessionId: string): Promise<RunResult | null> {
  // const key = datastore.key(["SessionState", sessionId]);
  const key = sessions.doc(sessionId);
  try {
    // const [entity] = await datastore.get(key);
    const entity = await key.get();
    return entity.data() as RunResult;
  } catch (error) {
    console.error("Error retrieving state:", error);
    return null;
  }
}

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

      // const boardRunnerOutput = await runner.runOnce(inputs, context);

      // return res.json({
      //   result: boardRunnerOutput,
      //   inputs,
      //   board: graph,
      // });
      for await (const runResult of runner.run(context)) {
        if (runResult.type === "input" || runResult.type === "output") {
          const sessionId = await saveState(runResult);
          return res.json({
            sessionId,
            result: runResult,
          });
        }
      }
      return res.json();
    } catch (e: any) {
      return res.status(500).json({
        message: e.message || "An error occurred",
      });
    }
  }
);

// export const app = https.onRequest(expressApp);
export { expressApp };
