const fs = require("fs");
const path = require("path");
const cuentasPath = path.join(__dirname, "../data/usuarios.json")


const controlador = {
    register: (req, res) => {
     //   const cuentas = JSON.parse(fs.readFileSync(cuentasPath, "utf-8"));

       // console.log(cuentas[1]);
        res.render("users/register" );//{cuentas}
    },
        postRegister: (req, res) =>{
            const cuentas = JSON.parse(fs.readFileSync(cuentasPath, "utf-8"));
            newCuenta = {
                id : Date.now(),
                nombre: req.body.nombre,
                contraseña: req.body.contraseña,
                confirmar: req.body.confirmar,
                email: req.body.email,
                pais: req.body.pais,
                localidad: req.body.localidad,
                direccion: req.body.direccion,
                genero: req.body.genero
            }
            cuentas.push(newCuenta);
            const cuentasJson = JSON.stringify(cuentas, null, ' ')
            fs.writeFileSync(cuentasPath, cuentasJson)
            res.redirect("/")
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