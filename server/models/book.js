'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 4,
          msg: "must be atleast 4 characters in length"
        }
      }
    },
    AuthorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    uploadBookName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    validate: {
      Empty(){
        if(this.uploadBookName == ''){
          throw new Error('Select PDF');
        }
      }
    },
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