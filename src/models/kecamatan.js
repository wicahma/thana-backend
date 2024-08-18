"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kecamatan extends Model {
    static associate(models) {
      this.hasMany(models.asset, {
        foreignKey: "kecamatan",
        sourceKey: "id",
      });
      models.asset.belongsTo(this, {
        foreignKey: "kecamatan",
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
