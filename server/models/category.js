'use strict';
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: 4,
          msg: "Name must be atleast 4 characters in length"
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.Book, {
          onDelete: "CASCADE",
          foreignKey: {
            foreignKey: 'CategoryId'
          }
        })
      }
    }
  });
  return Category;
};