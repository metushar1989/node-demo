import express from "express";
import { excelToJSONRouter } from "./excelTojson/excelTojson.router";

export const restRouter = express.Router();

restRouter.use("/exceltojson", excelToJSONRouter);