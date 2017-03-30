'use strict';
module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define('Book', {
        name: DataTypes.STRING,
        author_id: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                Book.belongsTo(models.Author, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                })
            }
        }
    });
    return Book;
};