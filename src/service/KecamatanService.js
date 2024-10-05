const { returnError, returnSuccess } = require("../helper/responseHandler");
const httpStatus = require("http-status");
const KecamatanDao = require("../dao/KecamatanDao");

class KecamatanService {
  constructor() {
    this.kecamatanDao = new KecamatanDao();
  }

  create = async (body) => {
    try {
      const kecamatan = await this.kecamatanDao.create(body);
      if (!kecamatan) {
        return returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Gagal membuat kecamatan!"
        );
      }
      return returnSuccess(
        httpStatus.CREATED,
        "Kecamatan berhasil ditambahkan!",
        kecamatan
      );
    } catch (e) {
      return returnError(httpStatus.INTERNAL_SERVER_ERROR, e);
    }
  };

  bulkCreate = async (data) => {
    try {
      const kecamatan = await this.kecamatanDao.bulkCreate(data);
      if (!kecamatan) {
        return returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Gagal membuat kecamatan!"
        );
      }
      return returnSuccess(
        httpStatus.CREATED,
        "Kecamatan berhasil ditambahkan!",
        kecamatan
      );
    } catch (e) {
      return returnError(httpStatus.INTERNAL_SERVER_ERROR, e);
    }
  };

  update = async (nama, id) => {
    try {
      const kecamatan = await this.kecamatanDao.updateById(nama, id);
      if (kecamatan[0] !== 1) {
        return returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Gagal mengupdate kecamatan!"
        );
      }
      return returnSuccess(httpStatus.OK, "Kecamatan berhasil diperbaharui!", {
        id,
        ...nama,
      });
    } catch (e) {
      return returnError(httpStatus.INTERNAL_SERVER_ERROR, e);
    }
  };

  list = async () => {
    try {
      const kecamatan = await this.kecamatanDao.findAll();
      return returnSuccess(
        httpStatus.OK,
        "Kecamatan berhasil ditampilkan!",
        kecamatan
      );
    } catch (e) {
      return returnError(httpStatus.INTERNAL_SERVER_ERROR, e);
    }
  };

  delete = async (id) => {
    try {
      console.log("id", id);
      const kecamatan = await this.kecamatanDao.deleteByWhere({
        id: id,
      });
      if (kecamatan !== 1) {
        return returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Gagal menghapus kecamatan!"
        );
      }
      return returnSuccess(httpStatus.OK, "Kecamatan berhasil dihapus!", null);
    } catch (e) {
      return returnError(httpStatus.INTERNAL_SERVER_ERROR, e.toString());
    }
  };
}

module.exports = KecamatanService;
