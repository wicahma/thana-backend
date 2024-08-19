const responseHandler = require("../helper/responseHandler");
const httpStatus = require("http-status");
const SkpdDao = require("../dao/SkpdDao");

class SkpdService {
  constructor() {
    this.skpdDao = new SkpdDao();
  }
}

module.exports = SkpdService;
