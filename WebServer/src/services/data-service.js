const fs = require("fs").promises;
const path = require("path");
const { UPSTOX_CONFIG } = require("../config/upstock");

class DataService {
  constructor() {
    this.filePathNSE = UPSTOX_CONFIG.NSEJsonFile;
    this.filePathBSE = UPSTOX_CONFIG.BSEJsonFile;
    this.nseData = null;
  }

  async GetIndicesKeys(exchangename) {
    try {
      const exchange =
        exchangename === "NSE" ? this.filePathNSE : this.filePathBSE;
      const Abspath = path.resolve(exchange);
      const filecontent = await fs.readFile(Abspath, "utf8");
      this.nseData = JSON.parse(filecontent);
      let indicesKey = [];
      for (let key in this.nseData) {
        if (this.nseData[key].instrument_type === "INDEX") {
          indicesKey.push(this.nseData[key].instrument_key);
        }
      }
      return indicesKey;
    } catch (error) {
      console.error(
        `Error loading JSON asynchronously using fs.promises.readFile() from ${this.filePath}:`,
        error.message
      );
      throw error; // Re-throw to allow caller to handle
    }
  }

  async getAllIndices() {
    try {
      const nseKeys = await this.GetIndicesKeys("NSE");
      const bseKeys = await this.GetIndicesKeys("BSE");
      return [...nseKeys, ...bseKeys];
    } catch (error) {
      console.error("Error fetching all indices:", error);
      throw error;
    }
  }
}

module.exports = new DataService();
