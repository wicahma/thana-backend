const httpStatus = require("http-status");
const SkpdService = require("../service/SkpdService");

class SkpdController {
  constructor() {
    this.skpdService = new SkpdService();
  }

  create = async (req, res) => {
    try {
      const { body } = req;
      const newSkpd = await this.skpdService.create(body);
      return res.status(newSkpd.statusCode).send(newSkpd.response);
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  update = async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const updatedSkpd = await this.skpdService.update(body, id);
      return res.status(updatedSkpd.statusCode).send(updatedSkpd.response);
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  delete = async (req, res) => {
    try {
      const deletedSkpd = await this.skpdService.delete(req.params.id);
      return res.status(deletedSkpd.statusCode).send(deletedSkpd.response);
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  list = async (req, res) => {
    try {
      const allSkpd = await this.skpdService.list();
      return res.status(allSkpd.statusCode).send(allSkpd.response);
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = SkpdController;
