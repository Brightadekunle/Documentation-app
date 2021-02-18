'use strict';
module.exports = (sequelize, DataTypes) => {
  var Application = sequelize.define('Application', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
  });

  Application.associate = (models) => {
    Application.hasMany(models.Document, { onDelete: "CASCADE", })

}


  return Application;
};