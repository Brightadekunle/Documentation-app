'use strict';

module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
  id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
  name: DataTypes.STRING,
  department: DataTypes.STRING,
  role: DataTypes.STRING,
  email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        isEmail: true,
    }},
  });

  Employee.associate = (models) => {
    Employee.hasMany(models.Document, { onDelete: "CASCADE", })
    Employee.hasMany(models.Comment, { onDelete: "CASCADE", })
  }

  return Employee;
};
