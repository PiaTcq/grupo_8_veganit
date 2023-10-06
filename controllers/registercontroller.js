const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const cuentasPath = path.join(__dirname, "../data/usuarios.json")
let db = require("../database/models")

const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier")
 
cloudinary.config({
    cloud_name: "dduyxqrqt",
    api_key: "867588739315874",
    api_secret: "meBOrwZzq5JG1CZJmut8pqVFtT0",
    debug: true
});

const controlador = {
    prueba:(req,res)=>{
    db.usuario.findAll()
       .then(function(usuario){
         res.render("users/prueba", {usuario:usuario});
       })
       
    },
    register: (req, res) => {

        res.render("users/register" );
    },
    postRegister: async (req, res) => {
      let errors = validationResult(req);
      
      /*console.log(req.file)*/
    
      if (errors.isEmpty()) {
        let hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const customFilename = `${Date.now()}`;
    
        try {
          
          const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path, {
            public_id: customFilename,
            overwrite: true
          });
    
          // Crea el usuario en la base de datos con la URL de la imagen de Cloudinary
          const newUser = await db.usuario.create({
            id: Date.now(),
            nombre: req.body.nombre,
            contraseña: hashedPassword,
            email: req.body.email,
            pais: req.body.pais,
            localidad: req.body.localidad,
            direccion: req.body.direccion,
            genero: req.body.genero,
            imagen: cloudinaryUpload.secure_url
          });
          /*streamifier.createReadStream(imageBuffer).pipe(newUser)*/
          console.log(cloudinaryUpload.secure_url)
          res.redirect("/");
        } catch (error) {
          console.error("Error:", error);
          res.status(500).send("Error al cargar la imagen o crear el usuario en la base de datos");
        }
      } else {
        res.render("users/register", { errors: errors.array() });
      }
      
    },
    /*postRegister: (req, res) =>{
        let errors = validationResult(req);
        let imageBuffer = req.file.buffer;
        

        if (errors.isEmpty()) {
            let hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const customFilename = `${Date.now()}.jpg`;

            const cloudinaryUpload = cloudinary.uploader.upload(req.file.path, {
                public_id: customFilename,
                overwrite: true
              });

            db.usuario.create({
                id: Date.now(),
                nombre: req.body.nombre,
                contraseña: hashedPassword,
                email: req.body.email,
                pais: req.body.pais,
                localidad: req.body.localidad,
                direccion: req.body.direccion,
                genero: req.body.genero,
                imagen: customFilename 
            }) 
            res.redirect("/");
          
        } else {
            res.render("users/register", { errors: errors.array() });
        }
        
    },*/
        editar: async (req, res) => {
                try {
                  const cuentita = await db.usuario.findByPk(req.params.id);

          if(cuentita){
                res.render("users/editar", {cuentita});
            }else{
                res.send("no se encontró al usuario :(")
            } 
        } catch (error) {
                console.error("Error:", error);
                res.status(500).send("Error al obtener los datos de la base de datos");
              }
        
            
    },
        editar2: async (req, res) => {
            try {
              const cuentita = await db.usuario.findByPk(req.params.id);
    if (cuentita){
        cuentita.nombre = req.body.nombre;
        cuentita.contraseña= req.body.contraseña,
        cuentita.confirmar= req.body.confirmar,
        cuentita.email= req.body.email,
        cuentita.pais= req.body.pais,
        cuentita.localidad= req.body.localidad,
        cuentita.direccion= req.body.direccion,
        cuentita.genero= req.body.genero

        await cuentita.save();
    res.redirect("/")
    }else{
        res.send("fallo al editar :(")
    } 
} catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error al editar los datos en la base de datos");
  }
    },
    //lista:(req,res)=>{
   //     const cuentas = JSON.parse(fs.readFileSync(cuentasPath, "utf-8"));
    //    res.render("users/lista", {cuentas});
   // },
    delete:async (req, res) => {
        try {
          const cuentita = await db.usuario.findByPk(req.params.id); 
    
          if (cuentita) {
            await cuentita.destroy();
            res.redirect("/");
          } else {
            res.send("No se encontró al usuario :(");
          }
        } catch (error) {
          console.error("Error:", error);
          res.status(500).send("Error al eliminar los datos de la base de datos");
        }
    },
    lista2:async(req,res)=>{
    try {
        const cuentas = await db.usuario.findAll();
        res.render("users/lista-usuarios", { cuentas });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error al obtener los datos de la base de datos");
    }
  
},
    api:(req, res) => {
      /*res.render("users/register");*/
      db.usuario
      .findAll()
      .then(usuario => {
        return res.status(300).json({
          total: usuario.length,
          data: usuario,
          status: 300
        })
      })
  },
  show:(req,res) => {
    db.usuario
      .findByPk(req.params.id)
      .then(usuario => {
        return res.status(300).json({
          data: usuario,
          status: 300
        })
      })
  }
}


module.exports = controlador;