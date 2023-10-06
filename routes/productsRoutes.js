const productoController = require('./../controllers/productoController');
const carritoController = require('./../controllers/carritoController');
const multer = require("multer");

const path = require("path");
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

/*const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       
     cb(null, path.join(__dirname,'../public/imagenes'));   
    },
    filename: function(req, file, cb) {          
     let imageName = Date.now() + path.extname(file.originalname);   
     cb(null, imageName);         
    }
});*/

const uploadFile = multer();

const ValidacionCrearProducto = [
    check("nombre").notEmpty().withMessage("El campo nombre no debe estar vacio"),
    check("precio").notEmpty().withMessage("El campo precio no debe estar vacio"),
    check("descripcion").notEmpty().withMessage("El campo descripcion no debe estar vacio"),
    check("fecha").notEmpty().withMessage("El campo fecha no debe estar vacio")
]


router.get("/producto", productoController.producto);

router.get("/carrito", carritoController.carrito);
router.get("/carrito2", carritoController.carrito2);

router.get("/crear-producto", productoController.crear);
router.post("/crear-producto",uploadFile.single('imagen'),ValidacionCrearProducto, productoController.store);

router.get("/editar-producto/:idProducto", productoController.editar);
router.put("/editar-producto/:idProducto",uploadFile.single('imagen'), productoController.update);

router.get("/lista-productos", productoController.listadoProductos);

router.get("/detalle-producto/:idProducto", productoController.detalle);

router.delete("/eliminar/:idProducto", productoController.eliminar);

router.get("/api", productoController.api);
router.get("/api/:id", productoController.show);

module.exports = router;