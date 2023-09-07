const path = require("path");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
//const { validationResult } = require("express-validator");
 
const controlador = {

    login: (req, res) => {
        res.render("users/login");
    },
    perfil: (req, res) => {
      res.render("users/detalle-usuario", {
        user: req.session.userLogged
      });
    },
    proccesLogin:  async(req,res)=>{
      try {

      
      let userToLogin = await User.findByField("nombre", req.body.nombre)
     
     if(userToLogin){
      /*console.log(userToLogin.contraseña)
      console.log(req.body.password)*/
    let isOkiDoky = bcrypt.compare/*Sync*/(req.body.password, userToLogin.contraseña);
    if(isOkiDoky){
      delete userToLogin.password;
      req.session.userLogged = userToLogin;
      
      return res.redirect("/users/perfil")
    }else{
      return res.render("users/login", {
        errors:{
          nombre:{
            msg: "La contraseña es invalida"
          }
        }
      })
     }
     }else{
      return res.render("users/login", {
        errors:{
          nombre:{
            msg: "no se encuentra al usuario"
          }
        }
      })
     }
    }catch(error){
      throw error;
    }
    },
    logOut: (req,res) => {
     req.session.destroy();
     return res.redirect("/")
    }
}


module.exports = controlador;