import * as express from "express";
import { Response } from "express-serve-static-core";
import * as functions from "firebase-functions";

const expressApp = express();

expressApp.get("/", async (req, res) => {
  try {
    return returnTimestamp(res, "/",req.path);

  } catch (e) {
    return Promise.reject(e);
  }
});

expressApp.get("/api", async (req, res) => {
  try {
    return returnTimestamp(res, "/api",req.path);
  } catch (e) {
    return Promise.reject(e);
  }
});

expressApp.get("/*", async (req, res) => {
  try {
    return returnTimestamp(res, `/*`,req.path);

  } catch (e) {
    return Promise.reject(e);
  }
});

export const app = functions.https.onRequest(expressApp);
function returnTimestamp(res: Response<any, Record<string, any>, number>, path: string,reqPath: string) {
  return res.status(200).send(`${path} -> ${reqPath}:\t${new Date().toISOString()}`);
}

