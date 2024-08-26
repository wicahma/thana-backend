"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Skpd extends Model {
    static associate(models) {
      this.hasMany(models.asset, {
        foreignKey: "skpd_id",
        sourceKey: "id",
      });
      models.asset.belongsTo(this, {
        foreignKey: "skpd_id",
        sourceKey: "id",
      });
    }
  }
  Skpd.init(
    {
      nama: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "skpd",
    }
  );
  return Skpd;
};
