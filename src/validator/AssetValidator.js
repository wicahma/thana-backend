const Joi = require("joi");
const httpStatus = require("http-status");
const ApiError = require("../helper/ApiError");
const skpd = require("../models/skpd");

class AssetValidator {
  async validateCreate(req, res, next) {
    const schema = Joi.object({
      skpd_id: Joi.number().required(),
      kecamatan_id: Joi.number().required(),
      penggunaan: Joi.string().required(),
      no_kib: Joi.string().required(),
      kode_barang: Joi.string().required(),
      uraian: Joi.string().required(),
      tanggal_perolehan: Joi.date().required(),
      luas: Joi.number().required(),
      alamat: Joi.string().required(),
      legalitas: Joi.string()
        .valid("Sertifikat", "Non Sertifikat")
        .allow(null, ""),
      tanggal_legalitas: Joi.date().allow(null, ""),
      nomor_legalitas: Joi.string().allow(null, ""),
      asal_usul: Joi.string()
        .valid("Beli", "Hibah", "Sewa", "Pinjam", "Pengadaan", "Lainnya")
        .not(null)
        .required(),
      harga: Joi.number().required(),
      keterangan: Joi.string().required(),
      kategori: Joi.string()
        .valid("Tanah Kosong", "Bangunan", "Jalan", "Drainase", "Lainnya")
        .not(null)
        .required(),
      desa: Joi.string().required(),
      kasus: Joi.boolean().required(),
      uraian_kasus: Joi.string()
        .valid(
          "Nihil",
          "Sengketa Masyarakat",
          "Sengketa Perusahaan",
          "Objek Tanah Tidak Jelas",
          "Kawasan Hutan",
          "Belum Balik Nama",
          "Proses Sertifikasi",
          "Pemanfaatan Tidak Sesuai RTRWK",
          "Bukti Hak Tidak Lengkap",
          "Data Awal belum sesuai kondisi Riil"
        )
        .not(null)
        .required(),
      pemanfaatan: Joi.boolean().required(),
      keterangan_lainnya: Joi.string().required(),
      pdf_legalitas: Joi.any().allow(null, ""),
      foto_1: Joi.string().allow(null, ""),
      foto_2: Joi.string().allow(null, ""),
      koordinats: Joi.any(),
    });

    if (req.user.type === "admin" && req.body.pdf_legalitas) {
      delete req.body.pdf_legalitas;
    }

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
    const schema = Joi.object({
      skpd_id: Joi.number().required(),
      kecamatan_id: Joi.number().required(),
      penggunaan: Joi.string().required(),
      no_kib: Joi.string().required(),
      kode_barang: Joi.string().required(),
      uraian: Joi.string().required(),
      tanggal_perolehan: Joi.date().required(),
      luas: Joi.number().required(),
      alamat: Joi.string().required(),
      legalitas: Joi.string()
        .valid("Sertifikat", "Non Sertifikat")
        .not(null)
        .required(),
      tanggal_legalitas: Joi.date().required(),
      nomor_legalitas: Joi.string().required(),
      asal_usul: Joi.string()
        .valid("Beli", "Hibah", "Sewa", "Pinjam", "Pengadaan", "Lainnya")
        .not(null)
        .required(),
      harga: Joi.number().required(),
      keterangan: Joi.string().required(),
      kategori: Joi.string()
        .valid("Tanah Kosong", "Bangunan", "Jalan", "Drainase", "Lainnya")
        .not(null)
        .required(),
      desa: Joi.string().required(),
      kasus: Joi.boolean().required(),
      uraian_kasus: Joi.string()
        .valid(
          "Nihil",
          "Sengketa Masyarakat",
          "Sengketa Perusahaan",
          "Objek Tanah Tidak Jelas",
          "Kawasan Hutan",
          "Belum Balik Nama",
          "Proses Sertifikasi",
          "Pemanfaatan Tidak Sesuai RTRWK",
          "Bukti Hak Tidak Lengkap",
          "Data Awal belum sesuai kondisi Riil"
        )
        .not(null)
        .required(),
      pemanfaatan: Joi.boolean().required(),
      keterangan_lainnya: Joi.string().required(),
      pdf_legalitas: Joi.any(),
      foto_1: Joi.string().required(),
      foto_2: Joi.string().required(),
      koordinats: Joi.any(),
    });

    const params = Joi.object({
      id: Joi.string().required(),
    });

    if (req.user.type === "admin" && req.body.pdf_legalitas) {
      delete req.body.pdf_legalitas;
    }

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
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    } else {
      req.params = value;
      return next();
    }
  }

  async validateGetById(req, res, next) {
    const schema = Joi.object({
      id: Joi.number().required(),
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

  async validateGetByUuid(req, res, next) {
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

module.exports = AssetValidator;
