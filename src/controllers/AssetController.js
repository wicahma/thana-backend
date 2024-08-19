const httpStatus = require("http-status");

class AssetController {
  constructor() {}

  async create(req, res) {
    try {
      res.status(httpStatus.OK).json({
        message: "Asset created",
      });
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  }

  async update(req, res) {
    try {
      res.status(httpStatus.OK).json({
        message: "Asset updated",
      });
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  }

  async delete(req, res) {
    try {
      res.status(httpStatus.OK).json({
        message: "Asset deleted",
      });
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  }

  async list(req, res) {
    try {
      res.status(httpStatus.OK).json({
        message: "Asset listed",
      });
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  }

  async detail(req, res) {
    try {
      res.status(httpStatus.OK).json({
        message: "Asset succesfully get detail",
      });
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  }
}

module.exports = AssetController;
