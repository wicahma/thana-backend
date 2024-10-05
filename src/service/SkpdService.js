const responseHandler = require("../helper/responseHandler");
const httpStatus = require("http-status");
const SkpdDao = require("../dao/SkpdDao");

class SkpdService {
  constructor() {
    this.skpdDao = new SkpdDao();
  }

  bulkCreate = async (body) => {
    try {
      const skpd = await this.skpdDao.bulkCreate(body);
      if (!skpd) {
        return responseHandler.returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Gagal membuat SKPD!"
        );
      }
      return responseHandler.returnSuccess(
        httpStatus.CREATED,
        "SKPD berhasil ditambahkan!",
        skpd
      );
    } catch (e) {
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, e);
    }
  };

  create = async (body) => {
    try {
      const skpd = await this.skpdDao.create(body);
      if (!skpd) {
        return responseHandler.returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Gagal membuat SKPD!"
        );
      }
      return responseHandler.returnSuccess(
        httpStatus.CREATED,
        "SKPD berhasil ditambahkan!",
        skpd
      );
    } catch (e) {
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, e);
    }
  };

  update = async (body, id) => {
    try {
      const skpd = await this.skpdDao.updateById(body, id);
      if (skpd[0] !== 1) {
        return responseHandler.returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Gagal mengupdate SKPD!"
        );
      }

      return responseHandler.returnSuccess(
        httpStatus.OK,
        "SKPD berhasil diperbaharui!",
        {
          id,
          ...body,
        }
      );
    } catch (e) {
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, e);
    }
  };

  list = async () => {
    try {
      const skpd = await this.skpdDao.findAll();
      return responseHandler.returnSuccess(
        httpStatus.OK,
        "SKPD berhasil ditampilkan!",
        skpd
      );
    } catch (e) {
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, e);
    }
  };

  delete = async (id) => {
    try {
      const skpd = await this.skpdDao.deleteByWhere({
        id: id,
      });
      if (skpd !== 1) {
        return responseHandler.returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Gagal menghapus SKPD!"
        );
      }
      return responseHandler.returnSuccess(
        httpStatus.OK,
        "SKPD berhasil dihapus!",
        null
      );
    } catch (e) {
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, e);
    }
  };
}

module.exports = SkpdService;
