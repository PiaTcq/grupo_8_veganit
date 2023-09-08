const fs = require("fs");
const path = require("path");
let db = require("../database/models");

const productosFilePath = path.join(__dirname, "../data/datos-productos.json");
const productos = JSON.parse(fs.readFileSync(productosFilePath,"utf-8"));
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

          
cloudinary.config({ 
  cloud_name: 'dn5goxzwt', 
  api_key: '895718294945439', 
  api_secret: 'HLfKK0N-CtUjFRJnik_8rl7-dXs' 
});

const controlador = {

    producto: (req, res) => {
        res.render("products/detalle-producto");
    },
    crear: (req,res) => {
        res.render("products/crear-producto");
    },
    store: async function (req, res) {
  
        const imageBuffer = req.file.buffer;
        const customFilename = `${Date.now()}${path.extname(req.file.originalname)}`;
    
        const uploadPromise = new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: customFilename}, (error, result) => {
            if (error) {
              console.error('Error subindo archivo:', error);
              reject(error);
            } else {
              console.log('Carga exitosa:', result);
              resolve(result);
            }
          });
          streamifier.createReadStream(imageBuffer).pipe(stream);
        });
    
        const uploadedImage = await uploadPromise;
      
        await db.producto.create({
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            imagen: customFilename,//nombreImagen,
            fecha_alta: req.body.fecha,
            fecha_baja: null,
        },{include:[{association:"usuario"},{association:"venta"}]})
        
        res.redirect("/products/lista-productos");
      },
    
    /*(req,res) => {
        let img = "https://facultadeducacion.uft.cl/wp-content/uploads/2020/08/arts.jpg";
        if (req.file) {
            const imageBuffer = req.file.buffer;
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const customFilename = 'product' + uniqueSuffix;
            

            const stream = cloudinary.uploader.upload_stream({ resource_type: 'imagen', public_id: customFilename }, function(error, result) {
                if (error) {
                  console.error(error);
                } else {
                  console.log(result);
                }
              });
            
             /*cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: customFilename }, (error, result) => {
                if (error) {
                    console.error('Error during upload: ', error);
                } else {
                    console.log('Upload successful: ', result);
                }
            });*/

    editar: async(req,res)=>{ 
        try {
            const edicion = await db.producto.findByPk(req.params.idProducto);
            res.render("products/editar-producto", { edicion });
        } catch (error) {
          console.error("Error:", error);
          res.status(500).send("Error al obtener los datos de la base de datos");
        }
    
    
    /*(req,res) => {
        let idProducto = req.params.idProducto;
        let productoBuscado;

        for(obj of productos){
            if(obj.id == idProducto){    // forma antigua
                productoBuscado= obj;
                break;
            }
        }
        res.render("products/editar-producto",{productoEnEdicion:productoBuscado});*/
    },
    update: (req,res) => {
        db.producto.update({
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            imagen: "",//nombreImagen,
        },
        {where:{id: req.params.idProducto}},
        {include:[{association:"usuario"},{association:"venta"}]})

        res.redirect("/products/lista-productos");
    },
    
    
    /*(req,res) =>{
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
    },*/
    listadoProductos: async(req,res)=>{ 
        try {
            const listado = await db.producto.findAll();
            res.render("products/listado-productos", { listado });
        } catch (error) {
          console.error("Error:", error);
          res.status(500).send("Error al obtener los datos de la base de datos");
        }
    
    
    /*(req,res) => {
        const productos = JSON.parse(fs.readFileSync(productosFilePath,"utf-8")); // forma antigua vinculada a json
        res.render("products/listado-productos",{productos:productos});*/
    },
    detalle: async(req,res)=>{ 
        try {
            const detalle = await db.producto.findByPk(req.params.idProducto);
            res.render("products/detalle-producto2", { detalle });
        } catch (error) {
          console.error("Error:", error);
          res.status(500).send("Error al obtener los datos de la base de datos");
        }
    
    /*(req,res) => {
        let idProducto = req.params.idProducto;
        let productoBuscado;

        for(obj of productos){
            if(obj.id == idProducto){      // forma antigua vinculada a json
                productoBuscado= obj;
                break;
            }
        }
        res.render("products/detalle-producto2",{productos:productoBuscado});*/
    },
    eliminar: (req, res) => {
        db.producto.destroy({
            where:{ id : req.params.idProducto}
        })
        res.redirect("/products/lista-productos");
    }
}
    
    /*(req,res) => {
        let idProducto = req.params.idProducto;
        let nuevoArregloProductos = productos.filter(function(e){
            return e.id != idProducto;
        });
        fs.unlinkSync(path.join(__dirname,'../public/imagenes',obj.imagen));
        fs.writeFileSync(productosFilePath, JSON.stringify(nuevoArregloProductos,null,""));
        res.redirect("/products/lista-productos");
    }
}*/


module.exports = controlador;