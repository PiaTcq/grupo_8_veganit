const loginController = require('./../controllers/loginController');
const registerController = require('./../controllers/registercontroller');

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const validateCreateForm = [
    check("nombre").notEmpty().withMessage("debes completar el nombre de usuario"),
    check("contraseña").notEmpty().withMessage("debes completar la contraseña"),
    check("confirmar").notEmpty().withMessage("debes confirmar la contraseña"),
    check("email").notEmpty().isEmail().withMessage("debes completar el campo con un email"),
    check("pais").notEmpty().withMessage("debes completar el campo país"),
    check("localidad").notEmpty().withMessage("debes completar el campo localidad"),
    check("direccion").notEmpty().withMessage("debes completar la dirección"),
    check("genero").notEmpty().withMessage("debes completar el genero"),
    check("robot").notEmpty().withMessage("debes aceptar los terminos y condiciones y verificar que no eres un robot")
];

router.get("/login", loginController.login);

//router.get("/lista", registerController.lista);

router.get("/lista-usuarios",registerController.lista2);

router.get("/register", registerController.register);
router.post("/register",validateCreateForm, registerController.postRegister);

router.get("/editar/:id", registerController.editar);
router.put("/editar/:id", registerController.editar2);

router.delete("/delete/:id", registerController.delete);

module.exports = router;