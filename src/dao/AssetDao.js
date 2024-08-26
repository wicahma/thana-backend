const SuperDao = require("./SuperDao");
const models = require("../models");

const Asset = models.asset;

class AssetDao extends SuperDao {
  constructor() {
    super(Asset);
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
          "fungsi",
          "uraian",
          "pemanfaatan",
          "keterangan_lainnya",
          "foto_1",
          "foto_2",
          "pdf_legalitas",
          "koordinats",
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
}

module.exports = AssetDao;
