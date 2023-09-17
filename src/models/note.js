const logger = require("../utils/logger");

// models/Note.js
module.exports = (sequelize,DataTypes) => {
  const Note = sequelize.define('note', {
    NoteID:{
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
      },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserID:{
      type: DataTypes.BIGINT,
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

  return Note;
};
