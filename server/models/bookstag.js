'use strict';
module.exports = function(sequelize, DataTypes) {
  var BooksTag = sequelize.define('BooksTag', {
    BookId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BooksTag;
};