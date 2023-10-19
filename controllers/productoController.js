const fs = require("fs");
const path = require("path");
const {validationResult} = require("express-validator");
let db = require("../database/models");


const productosFilePath = path.join(__dirname, "../data/datos-productos.json");
const productos = JSON.parse(fs.readFileSync(productosFilePath,"utf-8"));
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

          
cloudinary.config({
  cloud_name: "dduyxqrqt",
  api_key: "867588739315874",
  api_secret: "meBOrwZzq5JG1CZJmut8pqVFtT0",
  debug: true
});

const controlador = {

    producto: (req, res) => {
        res.render("products/detalle-producto");
    },
    crear: (req,res) => {
        res.render("products/crear-producto");
    },
    /*store: async function (req, res) {

        let errors = validationResult(req);
        if(errors.isEmpty()){
  
        const imageBuffer = req.file.buffer;
        const customFilename = `${Date.now()}${path.extname(req.file.originalname)}`;
    
        const uploadPromise = new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: customFilename}, (error, result) => {
            if (error) {
              console.error('Error subiendo archivo:', error);
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
      }
      else{
        res.render("products/crear-producto",{errors: errors.array()});
      }
    },*/
    
    store: async function (req, res) {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
          try {
              const imageBuffer = req.file.buffer;
              const customFilename = `${Date.now()}${path.extname(req.file.originalname)}`;
  
              const uploadPromise = new Promise((resolve, reject) => {
                  let stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: customFilename }, (error, result) => {
                      if (error) {
                          console.error('Error subiendo archivo:', error);
                          reject(error);
                      } else {
                          console.log('Carga exitosa:', result);
                          resolve(result.secure_url); // Usar result.secure_url para obtener la URL de la imagen
                      }
                  });
                  streamifier.createReadStream(imageBuffer).pipe(stream);
              });
  
              const imageUrl = await uploadPromise;
  
              await db.producto.create({
                  nombre: req.body.nombre,
                  precio: req.body.precio,
                  descripcion: req.body.descripcion,
                  imagen: imageUrl, // Usar la URL de la imagen
                  fecha_alta: req.body.fecha,
                  fecha_baja: null,
              }, { include: [{ association: "usuario" }, { association: "venta" }] });
  
              res.redirect("/products/lista-productos");
          } catch (error) {
              console.error("Error:", error);
              res.status(500).send("Error al cargar la imagen o crear el usuario en la base de datos");
          }
      } else {
          res.render("products/crear-producto", { errors: errors.array() });
      }
  },
  
    

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
            if(obj.id == idProducto){    // forma antigua de editar
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
        for(obj of productos){                          // forma antigua de subir lo editado
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
        const productos = JSON.parse(fs.readFileSync(productosFilePath,"utf-8")); // forma antigua de mostrar products vinculada a json
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
            if(obj.id == idProducto){      // forma antigua del detalle vinculada a json
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
    },
    api:(req, res) => {
        db.producto
        .findAll()
        .then(producto => {
          return res.status(300).json({
            total: producto.length,
            data: producto,
            status: 300
          })
        })
    },
    show:(req,res) => {
        db.producto
          .findByPk(req.params.id)
          .then(producto => {
            return res.status(300).json({
              data: producto,
              status: 300
            })
          })
      },
      lastcreated:(req, res) => {
        db.producto
        .findOne({
          order: [['id', 'DESC']]
        })
        .then(producto => {
          return res.status(300).json({
            data: producto
          });
        });
    },
    cheaper:(req, res) => {
      db.producto
      .findOne({
        order:[['precio', 'ASC']],
        limit:1
      })
      .then(producto => {
        return res.status(200).json({
          data: producto
        })
      })
    }
}
    
    /*(req,res) => {
        let idProducto = req.params.idProducto;
        let nuevoArregloProductos = productos.filter(function(e){
            return e.id != idProducto;                              // forma antigua de borrar
        });
        fs.unlinkSync(path.join(__dirname,'../public/imagenes',obj.imagen));
        fs.writeFileSync(productosFilePath, JSON.stringify(nuevoArregloProductos,null,""));
        res.redirect("/products/lista-productos");
    }
}*/


module.exports = controlador;