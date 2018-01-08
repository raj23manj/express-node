'use strict';
module.exports = function(sequelize, DataTypes) {
  var BookFeedback = sequelize.define('BookFeedback', {
    rating: DataTypes.INTEGER,
    BookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isActive: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return BookFeedback;
};