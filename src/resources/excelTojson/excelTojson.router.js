import express from 'express';
import excelToJSONController from './excelTojson.controller';

export const excelToJSONRouter = express.Router();

excelToJSONRouter.get('/',excelToJSONController.convertExcelToJSON);
