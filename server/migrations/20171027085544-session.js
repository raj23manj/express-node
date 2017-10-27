'use strict';

module.exports = {
  up: function (migration, DataTypes) {
    return migration.sequelize.query('CREATE TABLE "session" (\n' +
      '  "sid" varchar NOT NULL COLLATE "default",\n' +
      '\t"sess" json NOT NULL,\n' +
      '\t"expire" timestamp(6) NOT NULL\n' +
      ')\n' +
      'WITH (OIDS=FALSE);\n' +
      'ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;');
  },

  down: function (migration, DataTypes) {
    return migration.sequelize.query('DROP TABLE "session";');
  }
};