const path = require("path");

const controlador = {

    index: (req, res) => {
        res.render("index");
    }/*,
    paprobar: (req, res) => {
        res.render("paprobar");
    }*/
}

module.exports = controlador;