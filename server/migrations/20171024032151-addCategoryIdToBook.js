'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Books',
      'CategoryId',
      Sequelize.INTEGER)
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Books',
      'CategoryId')
  }
};
