const responseHandler = require("../helper/responseHandler");
const httpStatus = require("http-status");
const AssetDao = require("../dao/AssetDao");

class AssetService {
  constructor() {
    this.assetDao = new AssetDao();
  }
}

module.exports = AssetService;
