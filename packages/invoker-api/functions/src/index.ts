import { onRequest } from "firebase-functions/v2/https";
import { expressApp } from "./app/index.js";
import { invokeTaskHandler } from "./invokeTaskHandler.js";

export const api = onRequest(expressApp);

export const task = invokeTaskHandler();
