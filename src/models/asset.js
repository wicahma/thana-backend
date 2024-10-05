"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Asset.init(
    {
      uuid: DataTypes.UUID,
      penggunaan: DataTypes.STRING,
      no_kib: DataTypes.STRING,
      tanggal_perolehan: DataTypes.DATE,
      luas: DataTypes.NUMBER,
      alamat: DataTypes.STRING,
      legalitas: DataTypes.ENUM("Sertifikat", "Non Sertifikat"),
      tanggal_legalitas: DataTypes.DATE,
      nomor_legalitas: DataTypes.STRING,
      asal_usul: DataTypes.ENUM(
        "Pembelian",
        "Hibah",
        "Sewa",
        "Pinjam",
        "Lainnya"
      ),
      harga: DataTypes.NUMBER,
      kategori: DataTypes.ENUM(
        "Tanah Kosong",
        "Bangunan",
        "Jalan",
        "Drainase",
        "Lainnya"
      ),
      desa: DataTypes.STRING,
      kasus: DataTypes.BOOLEAN,
      uraian_kasus: DataTypes.ENUM(
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
      ),
      pemanfaatan: DataTypes.BOOLEAN,
      jenis_kategori: DataTypes.STRING,
      pdf_legalitas: DataTypes.STRING,
      foto_1: DataTypes.STRING,
      foto_2: DataTypes.STRING,
      koordinats: DataTypes.GEOMETRY("POLYGON"),
    },
    {
      sequelize,
      modelName: "asset",
    }
  );
  return Asset;
};
