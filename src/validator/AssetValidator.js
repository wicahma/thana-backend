const Joi = require("joi");
const httpStatus = require("http-status");
const ApiError = require("../helper/ApiError");

class AssetValidator {
  async validateCreate(req, res, next) {
    return next();
  }

  async validateUpdate(req, res, next) {
    return next();
  }

  async validateDelete(req, res, next) {
    return next();
  }

  async validateGetById(req, res, next) {
    return next();
  }
}

module.exports = AssetValidator;
