"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kecamatan extends Model {
    static associate(models) {
      this.hasMany(models.asset, {
        foreignKey: "kecamatan_id",
        sourceKey: "id",
      });
      models.asset.belongsTo(this, {
        foreignKey: "kecamatan_id",
        sourceKey: "id",
      });
    }
  }
  Kecamatan.init(
    {
      nama: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "kecamatan",
      underscored: true,
    }
  );
  return Kecamatan;
};
