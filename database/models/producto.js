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
        imagen: {
            type: dataTypes.STRING 
        },
        usuario_id: {
            type: dataTypes.STRING
        },
    }
    let config = {
        tableName: "producto",
        timestamps: false
    }
    let producto = sequelize.define(alias, cols, config);

    producto.associate = function(models){
        producto.belongsTo(models.usuario,{
            as: "usuario",
            foreignKey: "usuario_id"
        });
        producto.hasMany(models.venta,{
             as: "venta",
             foreignKey: "producto_id"
        })
        
    }
    
    return producto;
}