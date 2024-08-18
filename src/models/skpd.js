"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Skpd extends Model {
    static associate(models) {
      this.hasMany(models.asset, {
        foreignKey: "skpd",
        sourceKey: "id",
      });
      models.asset.belongsTo(this, {
        foreignKey: "skpd",
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
      underscored: true,
    }
  );
  return Skpd;
};
