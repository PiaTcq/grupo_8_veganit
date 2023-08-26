const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const cuentasPath = path.join(__dirname, "../data/usuarios.json")
let db = require("../database/models")

const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const cloudinary = require("cloudinary").v2;
/*const streamifier = require("streamifier")*/
 
cloudinary.config({
    cloud_name: "dduyxqrqt",
    api_key: "867588739315874",
    api_secret: "meBOrwZzq5JG1CZJmut8pqVFtT0"
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
    postRegister: (req, res) =>{
        let errors = validationResult(req);
        

        if (errors.isEmpty()) {
            let hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const customFilename = `${Date.now()}.jpg`;

            const cloudinaryUpload =  cloudinary.uploader.upload(req.file.path, {
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
                imagen: customFilename /*req.file.filename*/ /*cloudinaryUpload.secure_url*/ /*customFile*/
            }) 
            res.redirect("/");
        } else {
            res.render("users/register", { errors: errors.array() });
        }
    },
        editar:(req,res)=>{
            //res.render("users/editar");
            const cuentas = JSON.parse(fs.readFileSync(cuentasPath, "utf-8"));
            //const cuentita = cuentas.find((cuentita) => cuentita.nombre.toLowerCase() === req.params.nombre.toLowerCase());
            const cuentita = cuentas.find((cuentita) => cuentita.id.toString() === req.params.id.toString());
          if(cuentita){
                res.render("users/editar", {cuentita});
            }else{
                res.send("no se encontró al usuario :(")
            }
        
            
    },
        editar2:(req,res)=>{
      const cuentas = JSON.parse(fs.readFileSync(cuentasPath, "utf-8"));
     // const cuentita = cuentas.find((cuentita) => cuentita.nombre.toLowerCase() === req.params.nombre.toLowerCase());
     const cuentita = cuentas.find((cuentita) => cuentita.id.toString() === req.params.id.toString());
    if (cuentita){
        cuentita.nombre = req.body.nombre;
        cuentita.contraseña= req.body.contraseña,
        cuentita.confirmar= req.body.confirmar,
        cuentita.email= req.body.email,
        cuentita.pais= req.body.pais,
        cuentita.localidad= req.body.localidad,
        cuentita.direccion= req.body.direccion,
        cuentita.genero= req.body.genero

    fs.writeFileSync(cuentasPath, JSON.stringify(cuentas, null, " "))
    res.redirect("/")
    }else{
        res.send("fallo al editar :(")
    }
    },
    //lista:(req,res)=>{
   //     const cuentas = JSON.parse(fs.readFileSync(cuentasPath, "utf-8"));
    //    res.render("users/lista", {cuentas});
   // },
    delete:(req,res)=>{
        const cuentas = JSON.parse(fs.readFileSync(cuentasPath, "utf-8"));
        const borrado = cuentas.filter(cuentita => cuentita.id.toString() != req.params.id.toString());
        fs.writeFileSync(cuentasPath, JSON.stringify(borrado, null, " "));
        res.redirect("/");
    },
    lista2:(req,res)=>{
        const cuentas = JSON.parse(fs.readFileSync(cuentasPath, "utf-8"));
        res.render("users/lista-usuarios", {cuentas});
}
}


module.exports = controlador;