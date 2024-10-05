const httpStatus = require("http-status");
const AssetService = require("../service/AssetService");
const logger = require("../config/logger");
const { deleteFile } = require("../middlewares/fileHandler");

class AssetController {
  constructor() {
    this.assetService = new AssetService();
  }

  search = async (req, res) => {
    try {
      const asset = await this.assetService.searchAsset(req.query.q);
      res.status(asset.statusCode).send(asset.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  create = async (req, res) => {
    try {
      req.body.koordinats = JSON.parse(req.body.koordinats);
      if (!req.files) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ message: "Foto dan pdf legalitas harus diisi!" });
      }

      req.body.foto_1 = req.files.foto_1[0].path;
      req.body.foto_2 = req.files.foto_2[0].path;
      req.body.pdf_legalitas = req.files.pdf_legalitas[0].path;
      
      const asset = await this.assetService.createAsset(req.body);
      res.status(asset.statusCode).send(asset.response);
    } catch (e) {
      logger.error(e);
      Object.values(req.files).forEach((file) => {
        deleteFile(file[0].path);
      });
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  bulkCreate = async (req, res) => {
    try {
      let definedData = req.body.datas;
      req.body.datas.forEach((data, ind) => {
        Object.keys(data).forEach((key) => {
          if (data[key] === "null") {
            definedData[ind][key] = null;
          }
          if ([null, undefined, ""].includes(data[key])) {
            delete definedData[ind][key];
          }
          if (
            key === "koordinats" &&
            [null, undefined, ""].includes(data[key])
          ) {
            delete definedData[key];
          } else if (
            key === "koordinats" &&
            [null, undefined, "", 0].includes(definedData[key][0][0][0])
          ) {
            delete definedData[key];
          } else if (key === "koordinats") {
            definedData[key] = JSON.parse(data[key]);
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
      const detailAsset = await this.assetService.detailAsset(
        req.params.id,
        req.user.type
      );
      const definedData = { ...req.body };

      Object.keys(definedData).forEach((key) => {
        if ([null, undefined, ""].includes(definedData[key])) {
          delete definedData[key];
        }
        if (
          key === "koordinats" &&
          [null, undefined, ""].includes(definedData[key].coordinates)
        ) {
          delete definedData[key];
        }
      });

      Object.entries(req.files).forEach(([key, value]) => {
        switch (key) {
          case "foto_1":
            if (req.files.foto_1) {
              definedData.foto_1 = req.files.foto_1[0].path;
              const foto1 = deleteFile(
                detailAsset.response.data[0].dataValues.foto_1
              );
              console.log("foto1", foto1);
            } else {
              delete definedData.foto_1;
            }
            break;
          case "foto_2":
            if (req.files.foto_2) {
              definedData.foto_2 = req.files.foto_2[0].path;
              const foto2 = deleteFile(
                detailAsset.response.data[0].dataValues.foto_2
              );
              console.log("foto2", foto2);
            } else {
              delete definedData.foto_2;
            }
            break;
          case "pdf_legalitas":
            if (req.files.pdf_legalitas) {
              definedData.pdf_legalitas = req.files.pdf_legalitas[0].path;
              const pdf_legalitas = deleteFile(
                detailAsset.response.data[0].dataValues.pdf_legalitas
              );
              console.log("pdf_legalitas", pdf_legalitas);
            } else {
              delete definedData.pdf_legalitas;
            }
            break;
          default:
            break;
        }
      });

      definedData.koordinats = JSON.parse(req.body.koordinats);

      if (definedData.koordinats.coordinates.flat(Infinity).includes(0)) {
        delete definedData.koordinats;
      }

      const asset = await this.assetService.updateAsset(
        definedData,
        req.params.id
      );
      res.status(asset.statusCode).send(asset.response);
    } catch (e) {
      logger.error(e);
      Object.values(req.files).forEach((file) => {
        deleteFile(file[0].path);
      });
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
