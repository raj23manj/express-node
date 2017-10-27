'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Tag.belongsToMany(models.Book, {
          through: {
            model: BooksTag,
            unique: false
          },
          foreignKey: 'TagId',
          constraints: false
        });
      }
    }
  });
  return Tag;
};