const productoController = require('./../controllers/productoController');
const carritoController = require('./../controllers/carritoController');

const express = require("express");
const router = express.Router();

router.get("/producto", productoController.producto);

router.get("/carrito", carritoController.carrito);

router.get("/crear-producto", productoController.crear);
router.post("/crear-producto", productoController.store);

router.get("/editar-producto/:idProducto", productoController.editar);
router.put("/editar-producto/:idProducto", productoController.update);

router.get("/lista-productos", productoController.listadoProductos);

router.get("/detalle-producto/:idProducto", productoController.detalle);

router.delete("/eliminar/:idProducto", productoController.eliminar);

module.exports = router;