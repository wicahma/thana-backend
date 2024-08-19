const httpStatus = require("http-status");

class KecamatanController {
  constructor() {}

  create = async (req, res) => {
    try {
      res.status(httpStatus.CREATED).json({
        message: "Kecamatan created",
      });
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  update = async (req, res) => {
    try {
      res.status(httpStatus.OK).json({
        message: "Kecamatan updated",
      });
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  delete = async (req, res) => {
    try {
      res.status(httpStatus.OK).json({
        message: "Kecamatan deleted",
      });
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  list = async (req, res) => {
    try {
      res.status(httpStatus.OK).json({
        message: "Kecamatan listed",
      });
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = KecamatanController;
