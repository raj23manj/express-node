'use strict';
module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define('Author', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        message: 'Author name must be unique.',
        fields: [sequelize.fn('lower', sequelize.col('name'))]
      },
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
        Author.hasMany(models.Book)
      }
    }
  });
  return Author;
};