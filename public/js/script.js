window.addEventListener("load", function(){
    let formulario = document.getElementById("formulario-login")

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