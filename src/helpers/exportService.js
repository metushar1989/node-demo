const xlsx = require("xlsx");
const path = require("path");
const logTag = "export service";


const exportExcel = async (
  data,
  workSheetColumnNames,
  workSheetName,
  filePath,
  folderName
) => {
  const workBook = xlsx.utils.book_new();
  const finalWorkSheetName = await formatHeaderName(workSheetColumnNames);
  const workSheetData = [finalWorkSheetName, ...data];
  const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
  
  xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
  xlsx.writeFile(workBook, path.resolve(filePath));
  console.log(`${workSheetName}.xlsx file save in ${folderName} folder.`);
};

const formatHeaderName = async (workSheetColumnNames) => {
  try {
    const workSheetColumnName = [];
    workSheetColumnNames.map((name) => {
      let result = name
        .replace(/([A-Z]+)/g, " $1")
        .replace(/([A-Z] [a-z])/g, " $1");
      let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
      workSheetColumnName.push(finalResult);
    });
    return workSheetColumnName;
  } catch (error) {
    console.log(`Error | ${logTag} | formatHeaderName | ${error}`);
  }
};
module.exports = exportExcel;
