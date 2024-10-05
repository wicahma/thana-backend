const Joi = require("joi");
const httpStatus = require("http-status");
const ApiError = require("../helper/ApiError");

class KecamatanValidator {
  async validateCreate(req, res, next) {
    const schema = Joi.object({
      nama: Joi.string().required(),
    });

    const options = {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      const errorMessage = error.details
        .map((details) => {
          return details.message;
        })
        .join(", ");
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      req.body = value;
      return next();
    }
  }

  async validateBulkCreate(req, res, next) {
    const schema = Joi.object({
      kecamatan: Joi.array().items(
        Joi.object({
          nama: Joi.string().required(),
        })
      ),
    });

    const options = {
      abortEarly: true,
      allowUnknown: false,
      stripUnknown: true,
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      const errorMessage = error.details
        .map((details) => {
          return details.message;
        })
        .join(", ");
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      req.body = value;
      return next();
    }
  }

  async validateUpdate(req, res, next) {
    const schema = Joi.object({
      nama: Joi.string().required(),
    });

    const params = Joi.object({
      id: Joi.string().required(),
    });

    const options = {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    };

    const { error, value } = schema.validate(req.body, options);
    const { error: errorParams, value: valueParams } = params.validate(
      req.params,
      options
    );

    if (error || errorParams) {
      const errorMessage = error
        ? error.details
            .map((details) => {
              return details.message;
            })
            .join(", ")
        : errorParams.details
            .map((details) => {
              return details.message;
            })
            .join(", ");
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      req.body = value;
      req.params = valueParams;
      return next();
    }
  }

  async validateDelete(req, res, next) {
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    const options = {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    };

    const { error, value } = schema.validate(req.params, options);

    if (error) {
      const errorMessage = error.details
        .map((details) => {
          return details.message;
        })
        .join(", ");
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      req.params = value;
      return next();
    }
  }
}

module.exports = KecamatanValidator;
