const path = require("path");

const controlador = {

    index: (req, res) => {
        res.render("index");
    }
}

module.exports = controlador;