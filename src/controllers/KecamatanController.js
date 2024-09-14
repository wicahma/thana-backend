const httpStatus = require("http-status");
const KecamatanService = require("../service/KecamatanService");
const logger = require("../config/logger");

class KecamatanController {
  constructor() {
    this.kecamatanService = new KecamatanService();
  }

  create = async (req, res) => {
    try {
      const newKecamatan = await this.kecamatanService.create(req.body);
      res.status(newKecamatan.statusCode).send(newKecamatan.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  update = async (req, res) => {
    try {
      const updatedKecamatan = await this.kecamatanService.update(
        req.body,
        req.params.id
      );
      res.status(updatedKecamatan.statusCode).send(updatedKecamatan.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  delete = async (req, res) => {
    try {
      const deletedKecamatan = await this.kecamatanService.delete(
        req.params.id
      );
      res.status(deletedKecamatan.statusCode).send(deletedKecamatan.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  list = async (req, res) => {
    try {
      const kecamatan = await this.kecamatanService.list();
      res.status(kecamatan.statusCode).send(kecamatan.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = KecamatanController;
