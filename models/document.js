'use strict';
module.exports = (sequelize, DataTypes) => {
  var Document = sequelize.define('Document', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    subject: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,

  });

  Document.associate = (models) => {
    Document.belongsTo(models.Application, { onDelete: "CASCADE", })
    Document.belongsTo(models.Employee, { onDelete: "CASCADE", })
    Document.belongsTo(models.Type, { onDelete: "CASCADE", })
    Document.belongsToMany(models.Category, { through: 'DocumentCategory' })
    // Document.belongsTo(models.Category, { onDelete: "CASCADE" })
    Document.hasMany(models.Comment, { onDelete: "CASCADE" })
}

  return Document;
};