'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuario', {
        id: {
            type: dataTypes.STRING,
            primaryKey: true,
            defaultValue: uuid,
            allowNull: false
        },
        nombre: {
            type: dataTypes.STRING
        },
        contraseña: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        pais: {
            type: dataTypes.STRING
        },
        localidad: {
            type: dataTypes.STRING
        },
        direccion: {
            type: dataTypes.STRING
        },
        genero: {
            type: dataTypes.STRING
        },
        imagen: {
            type: dataTypes.STRING
        }
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuario')
  }
};