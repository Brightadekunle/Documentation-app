'use strict';
module.exports = (sequelize, DataTypes) => {
  var Type = sequelize.define('Type', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
  name: DataTypes.STRING
  });
  

  Type.associate = (models) => {
    Type.hasMany(models.Document, { onDelete: "CASCADE", })

}

  return Type;
};

// Make sure you complete other models fields