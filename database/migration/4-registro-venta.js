'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('registro-venta', {
        id:{type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true},
        fecha:{type:dataTypes.DATE},
        direccion:{type:dataTypes.STRING},
        email:{type:dataTypes.STRING}
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('registro-venta')
  }
};