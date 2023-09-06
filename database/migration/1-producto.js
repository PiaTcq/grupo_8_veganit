'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('producto', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.STRING
        },
        precio: {
            type: dataTypes.STRING
        },
        fecha_alta: {
            type: dataTypes.DATE
        },
        fecha_baja: {
            type: dataTypes.DATE
        },
        usuario_id: {
            type: dataTypes.STRING
        },
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('producto')
  }
};
