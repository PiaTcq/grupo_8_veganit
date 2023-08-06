const loginController = require('./../controllers/loginController');
const registerController = require('./../controllers/registercontroller');

const multer = require('multer');
const path = require("path");

const multerDiskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../public/imagenes'));
    },
    filename: function(req, file, cb) {          
        let imageName = Date.now() + path.extname(file.originalname);   
        cb(null, imageName);
    }
  })

  const uploadFile = multer({ storage: multerDiskStorage });

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");



const validateCreateForm = [
    check("nombre").notEmpty().withMessage("debes completar el nombre de usuario"),
    /*check("contraseña").notEmpty().withMessage("debes completar la contraseña"),*/
    check("password").notEmpty().withMessage("debes completar la contraseña"),
    check("email").notEmpty().isEmail().withMessage("debes completar el campo con un email"),
    check("pais").notEmpty().withMessage("debes completar el campo país"),
    check("localidad").notEmpty().withMessage("debes completar el campo localidad"),
    check("direccion").notEmpty().withMessage("debes completar la dirección"),
    /*check("imagen").notEmpty().withMessage("debes seleccionar una imagen"),*/
    check("genero").notEmpty().withMessage("debes completar el genero"),
    check("robot").notEmpty().withMessage("debes aceptar los terminos y condiciones y verificar que no eres un robot")
];



router.get("/login", loginController.login);

//router.get("/lista", registerController.lista);

router.get("/lista-usuarios",registerController.lista2);

router.get("/register", registerController.register);
router.post("/register", uploadFile.single('imagen'), validateCreateForm, registerController.postRegister);

router.get("/editar/:id", registerController.editar);
router.put("/editar/:id", registerController.editar2);

router.delete("/delete/:id", registerController.delete);

module.exports = router;