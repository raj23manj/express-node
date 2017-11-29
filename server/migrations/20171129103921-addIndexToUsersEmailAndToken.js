'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addIndex('Users', ['token']);
    queryInterface.addIndex('Users', ['email']);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('Users', ['token']);
    queryInterface.removeIndex('Users', ['email']);
  }
};
