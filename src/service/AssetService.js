const { returnError, returnSuccess } = require("../helper/responseHandler");
const httpStatus = require("http-status");
const AssetDao = require("../dao/AssetDao");
const { v4: uuidv4 } = require("uuid");
const { deleteFile } = require("../middlewares/fileHandler");

class AssetService {
  constructor() {
    this.assetDao = new AssetDao();
  }

  async searchAsset(query) {
    try {
      const asset = await this.assetDao.searchAsset(query);
      return returnSuccess(httpStatus.OK, "Asset berhasil diambil!", asset);
    } catch (e) {
      return returnError(httpStatus.INTERNAL_SERVER_ERROR, e.toString());
    }
  }

  async createAsset(body) {
    try {
      const uuid = uuidv4();

      const asset = await this.assetDao.create({ ...body, uuid });
      if (!asset) {
        deleteFile(body.foto_1);
        deleteFile(body.foto_2);
        deleteFile(body.pdf_legalitas);
        return returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Gagal membuat asset!"
        );
      }
      return returnSuccess(
        httpStatus.CREATED,
        "Asset berhasil ditambahkan!",
        asset
      );
    } catch (e) {
      deleteFile(body.foto_1);
      deleteFile(body.foto_2);
      deleteFile(body.pdf_legalitas);
      return returnError(httpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }

  async bulkCreateAsset(data) {
    try {
      const newData = data.map((item) => {
        const uuid = uuidv4();
        return { ...item, uuid: uuid };
      });
      const asset = await this.assetDao.bulkCreate(newData);
      if (!asset) {
        return returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Gagal membuat asset!"
        );
      }
      return returnSuccess(
        httpStatus.CREATED,
        "Asset berhasil ditambahkan!",
        asset
      );
    } catch (e) {
      return returnError(httpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }

  async allAsset() {
    try {
      const asset = await this.assetDao.findAllInclude();
      return returnSuccess(
        httpStatus.OK,
        "Semua asset berhasil diambil!",
        asset
      );
    } catch (e) {
      console.log(e);
      return returnError(httpStatus.INTERNAL_SERVER_ERROR, e.toString());
    }
  }

  async updateAsset(body, uuid) {
    try {
      const asset = await this.assetDao.updateByUuid(body, uuid);

      if (!asset || asset[0] == 0) {
        return returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Gagal mengupdate Asset!"
        );
      }

      return returnSuccess(httpStatus.OK, "Asset berhasil diperbaharui!", body);
    } catch (e) {
      return returnError(httpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }

  async deleteAsset(assetId) {
    try {
      const asset = await this.assetDao.deleteByWhere({ uuid: assetId });
      if (asset !== 1) {
        return returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Gagal menghapus asset!"
        );
      }
      return returnSuccess(httpStatus.OK, "Asset berhasil dihapus!");
    } catch (e) {
      return returnError(httpStatus.INTERNAL_SERVER_ERROR, e);
    }
  }

  async listAsset() {
    try {
      const asset = await this.assetDao.findAllExclude();
      return returnSuccess(
        httpStatus.OK,
        "Semua asset berhasil diambil!",
        asset
      );
    } catch (e) {
      console.log(e);
      return returnError(httpStatus.INTERNAL_SERVER_ERROR, e.toString());
    }
  }

  async listAssetUndone() {
    try {
      const asset = await this.assetDao.findAllExcludeUndone();
      return returnSuccess(
        httpStatus.OK,
        "Semua asset berhasil diambil!",
        asset
      );
    } catch (e) {
      console.log(e);
      return returnError(httpStatus.INTERNAL_SERVER_ERROR, e.toString());
    }
  }

  async detailAsset(assetUuid, userType) {
    try {
      console.log(userType);
      const asset = await this.assetDao.findByWhere({ uuid: assetUuid });
      if (asset.length < 1) {
        return returnError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Asset tidak ditemukan!"
        );
      }
      switch (userType) {
        case "guest":
          delete asset[0].dataValues.pdf_legalitas;
          delete asset[0].dataValues.id;
          delete asset[0].dataValues.uuid;
          delete asset[0].dataValues.kode_barang;
          break;
        case "admin":
          delete asset[0].dataValues.pdf_legalitas;
          break;
        default:
          break;
      }
      return returnSuccess(httpStatus.OK, "Asset berhasil diambil!", asset);
    } catch (e) {
      return returnError(httpStatus.INTERNAL_SERVER_ERROR, e.toString());
    }
  }

  async dashboardPreview() {
    try {
      const asalUsul = await this.assetDao.findCountGroupbyAsalUsul();
      const legalitas = await this.assetDao.findCountGroupbyLegalitas();
      const kategori = await this.assetDao.findCountGroupbyKategori();
      const kecamatan = await this.assetDao.findCountGroupbyKecamatan();
      const all = await this.assetDao.findCountAll();
      console.log("DATA KECAMATAN++", kecamatan);
      const kasus = await this.assetDao.findCountGroupbyKasus();
      return returnSuccess(
        httpStatus.OK,
        "Semua asset dashboard berhasil diambil!",
        {
          asalUsul,
          legalitas,
          kategori,
          kecamatan,
          kasus,
          all,
        }
      );
    } catch (e) {
      console.log(e);
      return returnError(httpStatus.INTERNAL_SERVER_ERROR, e.toString());
    }
  }
}

module.exports = AssetService;
