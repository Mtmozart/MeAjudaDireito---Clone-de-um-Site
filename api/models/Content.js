const { DataTypes } = require("sequelize");

const db = require("../db/conn");
const User = require('./User')
const Content = db.define("Content", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  }, 
   category: {
    type: DataTypes.TEXT,
    allowNull: false,
  }, 
   document: {
    type: DataTypes.STRING,
    allowNull: false,
  }
  });


Content.belongsTo(User);
User.hasMany(Content);

module.exports = Content;