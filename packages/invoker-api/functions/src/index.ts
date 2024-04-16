import { onRequest } from "firebase-functions/v2/https";
import { expressApp } from "./app/index.js";

export const api = onRequest(expressApp);
