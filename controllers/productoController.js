const fs = require("fs");
const path = require("path");

const productosFilePath = path.join(__dirname, "../data/datos-productos.json");
const productos = JSON.parse(fs.readFileSync(productosFilePath,"utf-8"))

const controlador = {

    producto: (req, res) => {
        res.render("products/detalle-producto");
    },
    crear: (req,res) => {
        res.render("products/crear-producto");
    },
    store: (req,res) => {
        let datosCreacion = req.body;
        console.log(datosCreacion);
        let idnuevoProducto = (productos[productos.length-1].id)+1;
        let nombreImagen = req.file.filename;
        let objNuevoProducto = {
            id: idnuevoProducto,
            nombre: datosCreacion.nombre,
            precio: parseInt(datosCreacion.precio),
            descripcion: datosCreacion.descripcion,
            imagen: nombreImagen
        }
        productos.push(objNuevoProducto);
        fs.writeFileSync(productosFilePath, JSON.stringify(productos,null,""));
        res.redirect("/products/lista-productos");
    },
    editar: (req,res) => {
        let idProducto = req.params.idProducto;
        let productoBuscado;

        for(obj of productos){
            if(obj.id == idProducto){
                productoBuscado= obj;
                break;
            }
        }
        res.render("products/editar-producto",{productoEnEdicion:productoBuscado});
    },
    update: (req,res) =>{
        let idProducto = req.params.idProducto;
        let nombreImagen = null;
        
        if(req.file){
            nombreImagen = req.file.filename;
        }
        for(obj of productos){
            if(obj.id==idProducto){
                obj.nombre=req.body.nombre;
                obj.precio=parseInt(req.body.precio);
                obj.descripcion=req.body.descripcion;
                if(nombreImagen){
                    fs.unlinkSync(path.join(__dirname,'../public/imagenes',obj.imagen));
                    obj.imagen=nombreImagen;
                }
                break;
            }
        }
        fs.writeFileSync(productosFilePath, JSON.stringify(productos,null,""));
        res.redirect("/products/lista-productos");
    },
    listadoProductos: (req,res) => {
        const productos = JSON.parse(fs.readFileSync(productosFilePath,"utf-8"));
        res.render("products/listado-productos",{productos:productos});
    },
    detalle: (req,res) => {
        let idProducto = req.params.idProducto;
        let productoBuscado;

        for(obj of productos){
            if(obj.id == idProducto){
                productoBuscado= obj;
                break;
            }
        }
        res.render("products/detalle-producto2",{productos:productoBuscado});
    },
    eliminar: (req,res) => {
        let idProducto = req.params.idProducto;
        let nuevoArregloProductos = productos.filter(function(e){
            return e.id != idProducto;
        });
        fs.unlinkSync(path.join(__dirname,'../public/imagenes',obj.imagen));
        fs.writeFileSync(productosFilePath, JSON.stringify(nuevoArregloProductos,null,""));
        res.redirect("/products/lista-productos");
    }
}


module.exports = controlador;