const productoController = require('./../controllers/productoController');
const carritoController = require('./../controllers/carritoController');
const multer = require("multer");

const path = require("path");
const express = require("express");
const router = express.Router();

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


router.get("/producto", productoController.producto);

router.get("/carrito", carritoController.carrito);

router.get("/crear-producto", productoController.crear);
router.post("/crear-producto",uploadFile.single('imagen'), productoController.store);

router.get("/editar-producto/:idProducto", productoController.editar);
router.put("/editar-producto/:idProducto",uploadFile.single('imagen'), productoController.update);

router.get("/lista-productos", productoController.listadoProductos);

router.get("/detalle-producto/:idProducto", productoController.detalle);

router.delete("/eliminar/:idProducto", productoController.eliminar);

module.exports = router;