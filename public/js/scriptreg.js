window.addEventListener("load", function(){
    let formulario = document.getElementById("formulario-register")

    formulario.addEventListener("submit", function(e){
        let errores = [];
        

        let nombre = document.getElementById("nombre")
        if(nombre.value == ""){
            errores.push("el campo de nombre no puede estar vacio")
        }
        let contraseña = document.getElementById("contraseña")
        if(contraseña.value == ""){
            errores.push("el campo de contraseña no puede estar vacio")
        }
        let email = document.getElementById("email")
        if(email.value == ""){
            errores.push("el campo de email no puede estar vacio")
        }
        let pais = document.getElementById("pais")
        if(pais.value == ""){
            errores.push("el campo de país no puede estar vacio")
        }
        let localidad = document.getElementById("localidad")
        if(localidad.value == ""){
            errores.push("el campo de localidad no puede estar vacio")
        }
        let direccion = document.getElementById("direccion")
        if(direccion.value == ""){
            errores.push("el campo de dirección no puede estar vacio")
        }
        let genero = document.getElementById("genero")
        if(genero.value == ""){
            errores.push("el campo de genero no puede estar vacio")
        }
      /*  let robot = document.getElementById("robot")
        if(robot.value == ""){
            errores.push("porfavor haga la verificacion")
          let terminos = document.getElementById("terminos")
        if(terminos.value == ""){
            errores.push("porfavor acepte los terminos")
        }*/
        

        if(errores.length > 0){
            e.preventDefault();
            ulErrores = document.querySelector("div.errores ul")
            ulErrores.innerHTML = " "
            for(let i=0; i < errores.length; i++){
            
             ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
             
            }
        }
    })
})