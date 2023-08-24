module.exports = function(sequelize, dataTypes){
    let alias = "ciudad";
    let cols = {
        id:{type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true},
        nombre:{type:dataTypes.STRING}
    }
    let config={
        tableName: "ciudad",
        timestamps: false
    }
    let ciudad = sequelize.define(alias, cols, config);
    return ciudad
}