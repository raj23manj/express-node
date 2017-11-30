'use strict';
var bcrypt = require('bcryptjs');
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
    token: DataTypes.STRING,
    is_verified: DataTypes.BOOLEAN
  },
  {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
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

  User.createUser = function(newUser, callback){
    // bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, 10, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
      });
    // });
  };

  User.comparePassword = function(candidatePassword, callback){
    bcrypt.hash(candidatePassword, 10, function(err, hash) {
      if (err) { throw (err); }
      bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        // res === true
        callback(null, isMatch);
      });
    }
    );
  }

  return User;
};

