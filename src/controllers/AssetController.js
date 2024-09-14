const httpStatus = require("http-status");
const AssetService = require("../service/AssetService");
const logger = require("../config/logger");
const { deleteFile } = require("../middlewares/fileHandler");

class AssetController {
  constructor() {
    this.assetService = new AssetService();
  }

  create = async (req, res) => {
    try {
      if (req.user.type === "admin" && req.body.pdf_legalitas) {
        deleteFile(req.file.path);
        return res
          .status(httpStatus.UNAUTHORIZED)
          .send("Admin tidak boleh mengupload pdf legalitas!");
      }
      req.body.koordinats = JSON.parse(req.body.koordinats);
      if (!req.file) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send("File foto dan dokumen harus diisi!");
      }
      const asset = await this.assetService.createAsset(req.body);
      res.status(asset.statusCode).send(asset.response);
    } catch (e) {
      logger.error(e);
      deleteFile(req.file.path);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  bulkCreate = async (req, res) => {
    try {
      let definedData = req.body.datas;

      req.body.datas.forEach((data, ind) => {
        Object.keys(data).forEach((key) => {
          if ([null, undefined, ""].includes(data[key])) {
            delete definedData[ind][key];
          }
        });
      });

      const asset = await this.assetService.bulkCreateAsset(definedData);
      res.status(asset.statusCode).send(asset.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  update = async (req, res) => {
    try {
      if (req.user.type === "admin" && req.body.pdf_legalitas) {
        deleteFile(req.file.path);
        return res
          .status(httpStatus.UNAUTHORIZED)
          .send("Admin tidak boleh mengupdate pdf legalitas!");
      }
      const definedData = { ...req.body };

      Object.keys(definedData).forEach((key) => {
        if ([null, undefined, ""].includes(definedData[key])) {
          delete definedData[key];
        }
      });

      definedData.koordinats = JSON.parse(req.body.koordinats);

      const asset = await this.assetService.updateAsset(
        definedData,
        req.params.id
      );
      res.status(asset.statusCode).send(asset.response);
    } catch (e) {
      logger.error(e);
      deleteFile(req.file.path);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  delete = async (req, res) => {
    try {
      const asset = await this.assetService.deleteAsset(req.params.id);
      res.status(asset.statusCode).send(asset.response);
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  list = async (req, res) => {
    try {
      const asset = await this.assetService.listAsset();
      res.status(asset.statusCode).send(asset.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  listUndone = async (req, res) => {
    try {
      const asset = await this.assetService.listAssetUndone();
      res.status(asset.statusCode).send(asset.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  all = async (req, res) => {
    try {
      const asset = await this.assetService.allAsset();
      res.status(asset.statusCode).send(asset.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  detailGuest = async (req, res) => {
    try {
      let userType = "guest";
      const asset = await this.assetService.detailAsset(
        req.params.id,
        userType
      );
      res.status(asset.statusCode).send(asset.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  detail = async (req, res) => {
    try {
      const asset = await this.assetService.detailAsset(
        req.params.id,
        req.user.type
      );
      res.status(asset.statusCode).send(asset.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  dashboardPreview = async (req, res) => {
    try {
      const asset = await this.assetService.dashboardPreview();
      res.status(asset.statusCode).send(asset.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = AssetController;
