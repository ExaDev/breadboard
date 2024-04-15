import { type HttpFunction } from "@google-cloud/functions-framework";
import express from "express";
import { expressApp } from "./app/index.js";

export const api: HttpFunction = async (
  req: express.Request,
  res: express.Response
) => {
  return expressApp(req, res);
};

export default api;
