'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.addColumn(
          'Books',
          'uploadBookName',
          Sequelize.STRING)
  },

  down: function (queryInterface, Sequelize) {
      queryInterface.removeColumn(
          'Books',
          'uploadBookName')
  }
};
