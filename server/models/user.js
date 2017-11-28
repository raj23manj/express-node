'use strict';
var bcrypt   = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        Empty(){
          if (this.first_name == '')
          {
            throw new Error(' cannot be empty!');
          }
        }
      }
    },
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        Empty(){
          if (this.email == '')
          {
            throw new Error(' cannot be empty!');
          }
        },
        Format(){
          var emailFormat = /[-.\w]+@(teamdrg.com)$/g;
          if(emailFormat.test(this.email) == false){
            throw new Error(' must end with @teamdrg.com');
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        Empty(){
          if (this.password == '')
          {
            throw new Error(' cannot be empty!');
          }
        }
      }
    },
    salt: DataTypes.STRING
  },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.password =this.generateHash(user.password);
        }
      },
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