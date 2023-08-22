module.exports = function(sequelize, dataTypes){
    let alias = "producto";

    let cols = {
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
        direccion: {
            type: dataTypes.STRING
        },
        usuario_id: {
            type: dataTypes.STRING
        },
        ciudad_id: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: "producto",
        timestamps: false
    }
    let producto = sequelize.define(alias, cols, config);

   /* producto.associate = function(models){
        producto.hasMany(models.usuario,{
            as: "usuario"
        })
    }*/
    
    return producto;
}