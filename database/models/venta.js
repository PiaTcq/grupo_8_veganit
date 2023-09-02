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

     venta.associate = function(models){
        venta.belongsTo(models.producto,{
            as: "producto",
            foreignKey: "producto_id"
        });
        venta.belongsTo(models.registro_venta,{
            as: "registro_venta",
            foreignKey: "registro_venta_id"
        })
    } 
    
    return venta;
}