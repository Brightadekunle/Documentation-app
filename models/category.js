'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
  name: DataTypes.STRING
  });


  Category.associate = (models) => {
    Category.hasMany(models.Document, { onDelete: "CASCADE" })
  }
  
  return Category;
};

// Make sure you complete other models fields