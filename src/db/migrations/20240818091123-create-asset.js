"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("assets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
      },
      skpd_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "skpds",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      kecamatan_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "kecamatans",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      penggunaan: {
        type: Sequelize.STRING,
      },
      no_kib: {
        type: Sequelize.STRING,
      },
      kode_barang: {
        type: Sequelize.STRING,
      },
      uraian: {
        type: Sequelize.STRING,
      },
      tanggal_perolehan: {
        type: Sequelize.DATE,
      },
      luas: {
        type: Sequelize.INTEGER,
      },
      alamat: {
        type: Sequelize.STRING,
      },
      legalitas: {
        type: Sequelize.ENUM("Sertifikat", "Non Sertifikat"),
      },
      tanggal_legalitas: {
        type: Sequelize.DATE,
      },
      nomor_legalitas: {
        type: Sequelize.STRING,
      },
      penggunaan: {
        type: Sequelize.STRING,
      },
      asal_usul: {
        type: Sequelize.ENUM(
          "Beli",
          "Hibah",
          "Sewa",
          "Pinjam",
          "Pengadaan",
          "Lainnya"
        ),
      },
      harga: {
        type: Sequelize.INTEGER,
      },
      keterangan: {
        type: Sequelize.STRING,
      },
      kategori: {
        type: Sequelize.ENUM(
          "Tanah Kosong",
          "Bangunan",
          "Jalan",
          "Drainase",
          "Lainnya"
        ),
      },
      fungsi: {
        type: Sequelize.STRING,
      },
      desa: {
        type: Sequelize.STRING,
      },
      kasus: {
        type: Sequelize.BOOLEAN,
      },
      uraian_kasus: {
        type: Sequelize.ENUM(
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
      },
      pemanfaatan: {
        type: Sequelize.BOOLEAN,
      },
      keterangan: {
        type: Sequelize.STRING,
      },
      pdf_legalitas: {
        type: Sequelize.STRING,
      },
      foto_1: {
        type: Sequelize.STRING,
      },
      foto_2: {
        type: Sequelize.STRING,
      },
      koordinats: {
        type: Sequelize.GEOMETRY("POLYGON"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Assets");
  },
};
