'use strict';
module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define('Book', {
        name: DataTypes.STRING,
        AuthorId: DataTypes.INTEGER
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
                })
            }
        }
    });
    return Book;
};