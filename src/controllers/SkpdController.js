const httpStatus = require("http-status");

class SkpdController {
  constructor() {}

  create = async (req, res) => {
    try {
      const { body } = req;
      const data = await this.skpdService.create(body);
      return res.status(httpStatus.CREATED).json(data);
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  update = async (req, res) => {
    try {
      const { body } = req;
      const data = await this.skpdService.update(body);
      return res.status(httpStatus.OK).json(data);
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  delete = async (req, res) => {
    try {
      const { body } = req;
      const data = await this.skpdService.delete(body);
      return res.status(httpStatus.OK).json(data);
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  list = async (req, res) => {
    try {
      const data = await this.skpdService.list();
      return res.status(httpStatus.OK).json(data);
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = SkpdController;
