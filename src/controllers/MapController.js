const httpStatus = require("http-status");
const MapService = require("../service/MapService");
const logger = require("../config/logger");

class MapController {
  constructor() {
    this.mapService = new MapService();
  }

  create = async (req, res) => {
    try {
      const { body, files } = req;
      body.url = files.layer[0].path;
      const newMap = await this.mapService.create(body);
      return res.status(newMap.statusCode).send(newMap.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  bulkCreate = async (req, res) => {
    try {
      const { body } = req;
      const newMap = await this.mapService.bulkCreate(body.skpd);
      return res.status(newMap.statusCode).send(newMap.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  update = async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const updatedMap = await this.mapService.update(body, id);
      return res.status(updatedMap.statusCode).send(updatedMap.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  delete = async (req, res) => {
    try {
      const deletedMap = await this.mapService.delete(req.params.id);
      return res.status(deletedMap.statusCode).send(deletedMap.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  list = async (req, res) => {
    try {
      const allMap = await this.mapService.list();
      return res.status(allMap.statusCode).send(allMap.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = MapController;
