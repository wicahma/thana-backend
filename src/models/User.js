const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.INTEGER,
      email_verified: DataTypes.INTEGER,
      type: DataTypes.ENUM("admin", "superadmin"),
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
