import fs from "fs";
import excelToJson from "convert-excel-to-json"; // https://www.npmjs.com/package/convert-excel-to-json
import { devConfig } from "../../config/env";
import saveJsonFile from "../../helpers/saveJsonFile";
import convertDateTime from "../../helpers/dateFormatter";
const logTag = `excel to JSON service`;
// const excelFileUrl = "C:/Users/11208/Downloads/SampleExcel.xlsx";
const excelFileUrl = `${__dirname}/file/SampleExcel.xlsx`

export default {
  async convertExcelToJSON() {
    try {
      const excelData = await getExcelFile();
      const formatDate = await convertDateTime(
        new Date(),
        `DD-MM-YYYY_HH-mm-ss`
      );
      await saveJsonFile(`File_${formatDate}.json`, excelData);
      return { status: "success", data: excelData };
    } catch (error) {
      console.log(`Error | ${logTag} | convertExcelToJSON | ${error}`);
      return false;
    }
  },
};

const getExcelFile = async () => {
  try {
    const result = excelToJson({
      source: fs.readFileSync(`${excelFileUrl}`),
      header: {
        rows: 1,
      },
      columnToKey: {
        "*": "{{columnHeader}}",
      },
      // columnToKey: {
      //   A: "OrderDate",
      //   B: "region",
      //   C: "rep",
      //   D:"item",
      //   E:"units",
      //   F:"unitCost",
      //   G:"total"
      // },
    });
    return result.Sheet1;
  } catch (error) {
    console.log(`Error | ${logTag} | getExcelFile | ${error}`);
  }
};
