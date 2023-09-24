const path = require("path");

const controlador = {

    carrito: (req, res) => {
        res.render("products/carrito");
    },
    carrito2: (req, res) => {
        res.render("products/carrito2");
    }
}

module.exports = controlador;