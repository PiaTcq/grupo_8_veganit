module.exports = function(sequelize, dataTypes){
    let alias = "venta";
    let cols = {
        id:{type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true},
        monto_unidad:{type:dataTypes.INTEGER},
        cantidad:{type:dataTypes.INTEGER},
        producto_id:{type:dataTypes.INTEGER},
        registro_venta_id:{type:dataTypes.INTEGER}
    }
    let config = {
        tableName: "venta",
        timestamps: false
    }
    let venta = sequelize.define(alias, cols, config);
    /* venta.associate = function(models){
        venta.belongsTo(models.producto,{
            as: "producto",
            foreignKey: "producto_id"
        })
    }*/   ////  UNA VENTA PERTENCE A UN PRODUCTO

     /* venta.associate = function(models){
        venta.belongsTo(models.registro_venta,{
            as: "producto",
            foreignKey: "registro_venta_id"
        })
    }*/ /// UNA VENTA PERTENECE A UN REGISTRO DE VENTAS
    return venta;
}