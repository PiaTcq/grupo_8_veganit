const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
module.exports = function(sequelize, dataTypes){
    let alias = "usuario";
 
    let cols = {
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
    }
    let config = {
        tableName: "usuario",
        timestamps: false
    }
    let usuario = sequelize.define(alias, cols, config);

    usuario.associate = function(models){
        usuario.hasMany(models.producto,{
            as: "producto",
            foreignKey:"usuario_id"
        })
    }
    
    return usuario;
}