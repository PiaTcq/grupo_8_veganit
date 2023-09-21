window.addEventListener("load", function(){
    let formulario = document.getElementById("formulario-login")

    formulario.addEventListener("submit", function(e){
        let errores = [];
        

        let nombre = document.getElementById("nombre")
        if(nombre.value == ""){
            errores.push("falta el nombre >:v")
        }
        let contraseña = document.getElementById("contraseña")
        if(contraseña.value == ""){
            errores.push("falta la contraseña >:v")
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