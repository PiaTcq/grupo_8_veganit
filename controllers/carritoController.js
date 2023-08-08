const path = require("path");

const controlador = {

    carrito: (req, res) => {
        res.render("products/carrito");
    }
}

module.exports = controlador;