const SuperDao = require("./SuperDao");
const models = require("../models");

const Asset = models.asset;

class AssetDao extends SuperDao {
  constructor() {
    super(Asset);
  }

  async findAllInclude() {
    return this.Model.findAll({
      include: [
        {
          model: models.kecamatan,
          as: "kecamatan",
          attributes: ["nama"],
          required: true,
        },
        {
          model: models.skpd,
          as: "skpd",
          required: true,
          attributes: ["nama"],
        },
      ],
      attributes: {
        include: [
          [models.sequelize.col("kecamatan.nama"), "kecamatan"],
          [models.sequelize.col("skpd.nama"), "skpd"],
        ],
        exclude: ["kecamatan_id", "skpd_id"],
      },
      raw: true,
      nest: true,
    })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async findAllExclude() {
    return this.Model.findAll({
      include: [
        {
          model: models.kecamatan,
          required: true,
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },
        {
          model: models.skpd,
          required: true,
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
        },
      ],
      attributes: {
        exclude: [
          "id",
          "no_kib",
          "kode_barang",
          "tanggal_perolehan",
          "luas",
          "tanggal_legalitas",
          "nomor_legalitas",
          "asal_usul",
          "harga",
          "keterangan",
          "kategori",
          "uraian",
          "pemanfaatan",
          "keterangan_lainnya",
          "foto_1",
          "foto_2",
          "pdf_legalitas",
        ],
      },
    })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async findCountGroupbyAsalUsul() {
    return this.Model.findAll({
      attributes: [
        "asal_usul",
        [models.sequelize.fn("COUNT", "asal_usul"), "total"],
      ],
      group: ["asal_usul"],
    })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async findCountGroupbyLegalitas() {
    return this.Model.findAll({
      attributes: [
        "legalitas",
        [models.sequelize.fn("COUNT", "legalitas"), "total"],
      ],
      group: ["legalitas"],
    })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async findCountGroupbyKategori() {
    return this.Model.findAll({
      attributes: [
        "kategori",
        [models.sequelize.fn("COUNT", "kategori"), "total"],
      ],
      group: ["kategori"],
    })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async findCountGroupbyKecamatan() {
    return this.Model.findAll({
      attributes: [
        "kecamatan_id",
        [
          models.sequelize.fn("COUNT", models.sequelize.col("kecamatan_id")),
          "total",
        ],
      ],
      include: [
        {
          model: models.kecamatan,
          required: true,
          attributes: ["nama"],
        },
      ],
      group: ["kecamatan_id", "kecamatan.nama"],
    })
      .then((result) => {
        console.log("DI RESULT ", result);
        return result;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async findCountGroupbyKasus() {
    return this.Model.findAll({
      attributes: [
        "uraian_kasus",
        [models.sequelize.fn("COUNT", "uraian_kasus"), "total"],
      ],
      group: ["uraian_kasus"],
    })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async findCountAll() {
    return this.Model.count()
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

module.exports = AssetDao;
