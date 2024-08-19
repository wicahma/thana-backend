const responseHandler = require("../helper/responseHandler");
const httpStatus = require("http-status");
const KecamatanDao = require("../dao/KecamatanDao");

class KecamatanService {
  constructor() {
    this.kecamatanDao = new KecamatanDao();
  }
}

module.exports = KecamatanService;
