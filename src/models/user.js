const logger = require("../utils/logger");

module.exports = (sequelize,DataTypes) => {
  const User = sequelize.define('user', {
      UserID:{
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
      },
    FullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    DateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    DateModified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    Deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  });
  

  return User;
};
