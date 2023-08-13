const path = require("path");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
//const { validationResult } = require("express-validator");

const controlador = {

    login: (req, res) => {
        res.render("users/login");
    },
    perfil: (req, res) => {
      res.render("users/perfil", {
        user: req.session.userLogged
      });
     /* console.log("estás en el perfil");
      console.log(req.session)*/
    },
    proccesLogin: (req,res)=>{
      // res.send(req.body)
      let userToLogin = User.findByField("nombre", req.body.nombre)
     // return res.send(userToLogin)
     if(userToLogin){
    let isOkiDoky = bcrypt.compareSync(req.body.password, userToLogin.password);
    if(isOkiDoky){
      delete userToLogin.password;
      req.session.userLogged = userToLogin;
      //return res.send("Puedes ingresar")
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
    },
    logOut: (req,res) => {
     req.session.destroy();
     return res.redirect("/")
    }
}


module.exports = controlador;