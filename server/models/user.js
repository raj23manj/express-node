'use strict';
var bcrypt   = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        },
        generateHash : function(password) {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        }
      },
      instanceMethods: {
        validPassword : function(password) {
          return bcrypt.compareSync(password, this.localpassword);
        }
      }
  });
  return User;
};