import { Firestore } from "@google-cloud/firestore";
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
import { initializeApp } from "firebase-admin/app";
import { getFunctions } from "firebase-admin/functions";
import { getFunctionUrl } from "./getFunctionUrl.js";
import { isBGL } from "./isBGL.js";
import { isValidURL } from "./isValidURL.js";

export function returnTimestamp(
  res: Response<any, Record<string, any>, number>,
  path: string,
  reqPath: string
) {
  return res
    .status(200)
    .send(`${path} -> ${reqPath}:\t${new Date().toISOString()}`);
}

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

const useEmulator = true;

if (useEmulator) {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
  process.env["FIREBASE_STORAGE_EMULATOR_HOST"] = "localhost:9199";
}

const app = initializeApp({
  projectId: "breadboard-ai-experiments",
});

expressApp.use(express.json());

expressApp.get("/status", async (req, res) => {
  res.json({
    status: "ok",
  });
});

/**
 * https://www.30secondsofcode.org/js/s/stringify-circular-json
 */
const stringifyCircularJSON = (obj: object) => {
  const seen = new WeakSet();
  return JSON.stringify(obj, (k, v) => {
    if (v !== null && typeof v === "object") {
      if (seen.has(v)) return;
      seen.add(v);
    }
    return v;
  });
};

/*
 * see: https://github.com/firebase/functions-samples/blob/main/Node/taskqueues-backup-images/functions/index.js
 */
expressApp.get("/enqueue", async (req, res) => {
  console.log("Enqueueing a task");
  const requestJson = JSON.parse(stringifyCircularJSON(req));
  if (!(req.body && req.body.url) && !(req.query && req.query.url)) {
    return res.status(400).json({
      message: "A URL must be provided in the request body or query string",
      requestJson,
    });
  }
  const url = req.body.url || req.query.url;

  if (!isValidURL(url)) {
    return res.status(400).json({
      message: `Invalid URL: \`${url}\``,
    });
  }
  let json: object;
  try {
    const response = await fetch(url);
    json = await response.json();
  } catch (e: any) {
    return res.status(500).json({
      message: e.message || `An error occurred while fetching "${url}"`,
    });
  }

  if (!isBGL(json)) {
    return res.status(400).json({
      message: `JSON at "${url}" is not a valid BGL`,
    });
  }

  let data: {
    url: string;
    board: object;
    sessionId?: string;
    createdAt?: Date;
  } = { url, board: json, createdAt: new Date() };

  const sessionId = await createSession(data);
  data["sessionId"] = sessionId;

  const queue = getFunctions(app).taskQueue("task");
  const targetUri = await getFunctionUrl("task");
  const task = {
    httpRequest: {
      httpMethod: "POST",
      url: targetUri,
      body: Buffer.from(JSON.stringify(data)).toString("base64"),
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
  await queue.enqueue(task);
  console.log("Task enqueued");
  return res.json({
    status: "ok",
    request: requestJson,
    data: data,
  });
  // const queueName =
  //   "projects/academic-works-403310/locations/us-central1/queues/task";
  // const client = new CloudTasksClient({
  //   // port: 8123,
  //   // servicePath: "localhost",
  //   // sslCreds: ChannelCredentials.createInsecure(),
  // });

  // const task = await client.createTask({
  //   parent: queueName,
  //   task: {
  //     httpRequest: {
  //       httpMethod: "GET",
  //       url: "http://localhost:5001/academic-works-403310/us-central1/api",
  //     },
  //   },
  // });
  // client.runTask({});
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

// const convertToJson = (obj: any) => {
//   return Object.entries(obj) // Create array from object
//     .map(([key, value]) => {
//       const newLocal_1 = key.startsWith("#") ? key.substring(1) : key;
//       const newLocal = [
//         newLocal_1,
//         value,
//       ];
//       return newLocal;
//     })
//     .reduce((acc, [key, value]) => {
//       // Transform back to object
//       acc[key] = value;
//       return acc;
//     }, {} as any);
// };

// class Serializer{
//     types: any;
//     constructor(types: any){this.types = types;}
//     serialize(object
//     ) {
//         let idx = this.types.findIndex((e: { name: any; })=> {return e.name == object.constructor.name});
//         if (idx == -1) throw "type  '" + object.constructor.name + "' not initialized";
//         return JSON.stringify([idx, Object.entries(object)]);
//     }
//     deserialize(jstring: string) {
//         let array = JSON.parse(jstring);
//         let object = new this.types[array[0]]();
//         array[1].map((e: any[])=>{object[e[0]] = e[1];});
//         return object;
//     }
// }

// const db = new Firestore();
// const sessions = db.collection("SessionState");
export async function createSession<T extends { [x: string]: any }>(
  data: T
): Promise<string> {
  const sessionId = randomUUID();
  const key = sessions.doc(sessionId);
  await key.set(data);
  return sessionId;
}
export async function updateSession<T extends { [x: string]: any }>(
  sessionId: string,
  data: T
): Promise<void> {
  const db = new Firestore();
  const sessions = db.collection("SessionState");
  const key = sessions.doc(sessionId);
  await key.update(data);
}
export async function getSession<T extends { [x: string]: any }>(
  sessionId: string
): Promise<T> {
  const db = new Firestore();
  const sessions = db.collection("SessionState");
  const key = sessions.doc(sessionId);
  const entity = await key.get();
  return entity.data() as T;
}

// Helper function to save state to Google Cloud Datastore
async function saveState(state: RunResult) {
  const sessionId = randomUUID();
  // const key = datastore.key(["SessionState", sessionId]);
  const key = sessions.doc(sessionId);

  // // const converted = convertToJson({ ...state });
  // const serializer = new Serializer([RunResult]);
  // const converted = serializer.serialize(state);

  const stringified = JSON.stringify(state);
  const toString = state.toString();
  class GenericClass {
    constructor(state: RunResult) {
      Object.assign(this, state);
    }
    toJson() {
      return JSON.stringify(this);
    }
  }

  const reinstantiated = new GenericClass(state);
  const toJson = reinstantiated.toJson();
  type RunResultDTO = Omit<RunResult, "">;
  const destructured: RunResultDTO = {
    inputArguments: state.inputArguments,
    invocationId: state.invocationId,
    outputs: (() => {
      try {
        return state.outputs;
      } catch (e) {
        return undefined as any;
      }
    })(),
    node: state.node,
    path: state.path,
    runState: state.runState,
    state: state.state,
    type: state.type,
    inputs: state.inputs,
    save: state.save,
    timestamp: state.timestamp,
    isAtExitNode: state.isAtExitNode,
  };

  const serialized = { ...state, state: state.state };
  // const deserialized = deserialize(serialized);
  const entity = {
    key: key,
    data: serialized,
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
    return entity.data() as any;
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

      // const harness = run({
      //   url: ".",
      //   kits,
      //   remote: undefined,
      //   proxy: undefined,
      //   diagnostics: false,
      //   runner: runner,
      // } satisfies RunConfig);
      // await runner.runOnce(inputs, context);
      const runResult: IteratorResult<RunResult, any> = await runner
        .run(context, inputs)
        .next();

      await saveState(runResult.value);

      // return res.json({
      //   result: boardRunnerOutput,
      //   inputs,
      //   board: graph,
      // });
      // for await (const runResult of harness) {
      //   if (runResult.type === "input" || runResult.type === "output") {
      //     const sessionId = await saveState(runResult);
      //     return res.json({
      //       sessionId,
      //       result: runResult,
      //     });
      //   }
      // }

      // const resultOne = await run({}).next();
      // const resultTwo = await run({
      //   result: resultOne,
      // }).next();
      // const resultThree = await run({
      //   result: resultTwo,
      // }).next();
      // for await (const runResult of run(context)) {
      // }

      // const iterator = harness.run();
      // let result = await iterator.next();
      // while (!result.done) {
      //   console.log(result.value);
      //   await delay(ms); // wait between each result.
      //   result = await iterator.next();
      // }
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
