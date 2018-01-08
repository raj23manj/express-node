'use strict';
module.exports = function(sequelize, DataTypes) {
  var ImportData = sequelize.define('ImportData', {
    name: DataTypes.STRING,
    demo_date: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ImportData;
};