import fs from "fs";
import moment from "moment";

const convertDateTime = async (date,format) => {
    try {
      const formatDatTime = `${moment(date).format(format)}`;
      return formatDatTime;
    } catch (error) {
      console.log(`Error | ${logTag} | convertDateTime | ${error}`);
      return false
    }
  };

module.exports = convertDateTime;