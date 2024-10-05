const responseHandler = require("../helper/responseHandler");
const httpStatus = require("http-status");
const MapLayerDao = require("../dao/MapDao");
const { deleteFile } = require("../middlewares/fileHandler");

class MapService {
  constructor() {
    this.mapLayerDao = new MapLayerDao();
  }

  create = async (body) => {
    try {
      const map = await this.mapLayerDao.create(body);
      if (!map) {
        deleteFile(body.url);
        return responseHandler.returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Gagal menambahkan Layer!"
        );
      }
      return responseHandler.returnSuccess(
        httpStatus.CREATED,
        "Layer berhasil ditambahkan!",
        map
      );
    } catch (e) {
      deleteFile(body.url);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, e);
    }
  };

  update = async (body, id) => {
    try {
      const map = await this.mapLayerDao.updateById(body, id);
      if (map[0] !== 1) {
        return responseHandler.returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Gagal mengupdate Layer!"
        );
      }

      return responseHandler.returnSuccess(
        httpStatus.OK,
        "Layer berhasil diperbaharui!",
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
      const map = await this.mapLayerDao.findAll();
      return responseHandler.returnSuccess(
        httpStatus.OK,
        "Layer berhasil ditampilkan!",
        map
      );
    } catch (e) {
      console.log();
      console.log(e);
      console.log();
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, e);
    }
  };

  delete = async (id) => {
    try {
      const layer = await this.mapLayerDao.deleteByWhere({
        id: id,
      });
      if (layer !== 1) {
        return responseHandler.returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Gagal menghapus layer!"
        );
      }
      return responseHandler.returnSuccess(
        httpStatus.OK,
        "Layer berhasil dihapus!",
        null
      );
    } catch (e) {
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, e);
    }
  };
}

module.exports = MapService;
