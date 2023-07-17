const path = require("path");

const controlador = {

    producto: (req, res) => {
        res.render("products/detalle-producto");
    },
    crear: (req,res) => {
        res.render("products/crear-producto");
    },
    editar: (req,res) => {
        res.render("products/editar-producto");
    },
    listadoProductos: (req,res) => {
        res.render("products/listado-productos");
    },
    detalle: (req,res) => {
        res.render("products/detalle-producto2");
    }
}


module.exports = controlador;