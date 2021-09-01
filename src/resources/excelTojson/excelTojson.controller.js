import messages from "../../utils/messages";

import fs from "fs";
import moment from "moment";
import excelTojsonService from "./excelTojson.service";


const logTag = "excel to JSON controller";

export default {
  async convertExcelToJSON(req, res) {
    try {
      const _respNew = await excelTojsonService.convertExcelToJSON();

      if (_respNew.status === `error`) {
        return res.status(400).json({
          success: false,
          message: `No data found.`,
          data: null,
        });
      }

      if (_respNew.status === `success`) {
        const formatResp = {
          success: true,
          message: `Data found.`,
          data: _respNew.data,
        };
        return res.status(200).json(formatResp);
      }
    } catch (error) {
      console.log(`Error | ${logTag} | sendDataToOP | ${error}`);
      return res.status(500).json({
        success: false,
        message: messages.SERVER_ERROR,
        data: error,
      });
    }
  }
}
