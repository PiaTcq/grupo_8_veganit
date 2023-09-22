window.addEventListener("load",function(){

    let formulario = document.getElementById("formulario");
    let p1 = document.getElementById("p1");

    formulario.addEventListener("submit",function(e){
        
        let errores = {}

        let nombre = document.getElementById("nombre");
        if(nombre.value == ""){
            errores.push ="El campo nombre no puede estar vacio."
        }
        let precio = document.getElementById("precio");
        if(precio.value == ""){
            errores.push ="El campo precio no puede estar vacio."
        }
        let descripcion = document.getElementById("descripcion");
        if(descripcion.value == ""){
            errores.push ="El campo descripcion no puede estar vacio."
        }
        let fecha = document.querySelector("fecha");
        if(fecha.value == ""){
            errores.push ="El campo fecha no puede estar vacio."
        }
        if(errores.length >= 1){
            e.preventDefault();
            let ulErrores = document.querySelector("div.errores ul")
            ulErrores.innerHTML = " "
            for(let i=0; i < errores.length; i++){
                ulErrores.style.color = "red";
                ulErrores.style.fontSize = "13px";
                ulErrores.innerText = errores[i]
                
            }   
        }
    })

})