const httpStatus = require("http-status");
const AssetService = require("../service/AssetService");

class AssetController {
  constructor() {
    this.assetService = new AssetService();
  }

  create = async (req, res) => {
    try {
      if (req.user.type === "admin" && req.body.pdf_legalitas) {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .send("Admin tidak boleh mengupload pdf legalitas!");
      }
      const asset = await this.assetService.createAsset(req.body);
      res.status(asset.statusCode).send(asset.response);
    } catch (e) {
      console.log(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  update = async (req, res) => {
    try {
      if (req.user.type === "admin" && req.body.pdf_legalitas) {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .send("Admin tidak boleh mengupdate pdf legalitas!");
      }
      const asset = await this.assetService.updateAsset(req.body, req.params.id);
      res.status(asset.statusCode).send(asset.response);
    } catch (e) {
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
      console.log(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  detailGuest = async (req, res) => {
    try {
      let userType = "guest";
      const asset = await this.assetService.detailAsset(req.params.id, userType);
      res.status(asset.statusCode).send(asset.response);
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  detail = async (req, res) => {
    try {
      const asset = await this.assetService.detailAsset(req.params.id, req.user.type);
      res.status(asset.statusCode).send(asset.response);
    } catch (e) {
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = AssetController;
