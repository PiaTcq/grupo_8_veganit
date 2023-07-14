const productoController = require('./../controllers/productoController');
const carritoController = require('./../controllers/carritoController');

const express = require("express");
const router = express.Router();

router.get("/producto", productoController.producto);

router.get("/carrito", carritoController.carrito);

router.get("/crear-producto", productoController.crear);

module.exports = router;