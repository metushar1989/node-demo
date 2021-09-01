import fs from "fs";
const dir = "./JSON";

const saveJsonFile = async (fileName, data) => {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    await fs.writeFileSync(`${dir}/${fileName}`, JSON.stringify(data));
  } catch (error) {
    console.log(`Error | ${logTag} | saveJsonFile | ${error}`);
  }
};

module.exports = saveJsonFile;
