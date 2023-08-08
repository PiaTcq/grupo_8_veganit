const path = require("path");

const controlador = {

    login: (req, res) => {
        res.render("users/login");
    }
}

module.exports = controlador;