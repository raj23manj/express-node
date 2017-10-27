'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    name: DataTypes.STRING,
    AuthorId: DataTypes.INTEGER,
    uploadBookName: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Book.belongsTo(models.Author, {
          onDelete: "CASCADE",
          foreignKey: {
            foreignKey: 'AuthorId',
            targetKey: 'id',
            allowNull: false
          }
        }),
        Book.belongsTo(models.Category, {
          onDelete: "CASCADE",
          foreignKey: {
            foreignKey: 'CategoryId',
            targetKey: 'id',
            allowNull: false
          }
        }),
        Book.belongsToMany(models.Tag, {
          through: {
            model: models.BooksTag,
            unique: false
          },
          foreignKey: 'BookId',
          constraints: false
        });
      }
    }
  });
  return Book;
};