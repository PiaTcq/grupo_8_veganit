'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('venta', {
        id:{type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true},
        monto_unidad:{type:dataTypes.INTEGER},
        cantidad:{type:dataTypes.INTEGER},
        producto_id:{type:dataTypes.INTEGER},
        registro_venta_id:{type:dataTypes.INTEGER}
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('venta')
  }
};