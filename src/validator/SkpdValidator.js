const Joi = require("joi");
const httpStatus = require("http-status");
const ApiError = require("../helper/ApiError");

class SkpdValidator {
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

  async validateUpdate(req, res, next) {
    const options = {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    };
    const schema = Joi.object({
      nama: Joi.string().required(),
    });
    const params = Joi.object({
      id: Joi.number().required(),
    });
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
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      req.body = value;
      req.params = valueParams;
      return next();
    }
  }
}

module.exports = SkpdValidator;
