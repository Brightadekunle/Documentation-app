'use strict';
module.exports = (sequelize, DataTypes) => {
  var DocumentCategory = sequelize.define('DocumentCategory', {
  });

  DocumentCategory.associate = (models) => {
    DocumentCategory.belongsTo(models.Document)
    DocumentCategory.belongsTo(models.Category)
  }
  
  return DocumentCategory;
};

// Make sure you complete other models fields