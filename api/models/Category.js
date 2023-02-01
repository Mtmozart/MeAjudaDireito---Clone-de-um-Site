const { DataTypes } = require("sequelize");

const db = require("../db/conn");
const User = require('./User')
const Category = db.define("Category", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  }
  });


Category.belongsTo(User);
User.hasMany(Category);

module.exports = Category;