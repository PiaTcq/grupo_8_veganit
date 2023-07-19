const loginController = require('./../controllers/loginController');
const registerController = require('./../controllers/registercontroller');

const express = require("express");
const router = express.Router();

router.get("/login", loginController.login);

//router.get("/lista", registerController.lista);

router.get("/lista-usuarios",registerController.lista2);

router.get("/register", registerController.register);
router.post("/register", registerController.postRegister);

router.get("/editar/:id", registerController.editar);
router.put("/editar/:id", registerController.editar2);

router.delete("/delete/:id", registerController.delete);

module.exports = router;