module.exports = function(sequelize, dataTypes){
    let alias = "usuario";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        dirección: {
            type: dataTypes.STRING
        }/*,
        genero: {
            type: dataTypes.STRING
        },*/
    }
    let config = {
        tableName: "usuario",
        timestamps: false
    }
    let usuario = sequelize.define(alias, cols, config);

   /* usuario.associate = function(models){
        usuario.hasMany(models.producto,{
            as: "producto"
        })
    }*/
    
    return usuario;
}