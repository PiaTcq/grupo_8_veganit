module.exports = function(sequelize, dataTypes){
    let alias = "registro_venta";
    let cols = {
        id:{type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true},
        fecha:{type:dataTypes.DATE},
        direccion:{type:dataTypes.STRING},
        email:{type:dataTypes.STRING}
    }
    let config= {
        tableName: "registro_venta",
        timestamps: false
    }
    let registro_venta = sequelize.define(alias, cols, config);
    return registro_venta;
}