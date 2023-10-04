window.addEventListener("load",function(){
    console.log("El archivo crearProducto-validator.js se ha cargado correctamente.");

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
        if(errores.length > 0){
            e.preventDefault();
            ulErrores = document.querySelector("div.errores ul")
            ulErrores.innerHTML = " "
            for(let i=0; i < errores.length; i++){
               
                ulErrores.innerText = errores[i]
                
            }   
        } 
    })

})
/*
window.addEventListener("load", function () {
    let formulario = document.getElementById("formulario");
    let p1 = document.getElementById("p1");
  
    formulario.addEventListener("submit", function (e) {
      let errores = {};
  
      let nombre = document.getElementById("nombre");
      if (nombre.value === "") {
        errores.nombre = "El campo nombre no puede estar vacío.";
      }
  
      let precio = document.getElementById("precio");
      if (precio.value === "") {
        errores.precio = "El campo precio no puede estar vacío.";
      }
  
      let descripcion = document.getElementById("descripcion");
      if (descripcion.value === "") {
        errores.descripcion = "El campo descripción no puede estar vacío.";
      }
  
      let fecha = document.getElementById("fecha");
      if (fecha.value === "") {
        errores.fecha = "El campo fecha no puede estar vacío.";
      }
  
      if (Object.keys(errores).length > 0) {
        e.preventDefault();
        let ulErrores = document.querySelector("div.errores ul");
        ulErrores.innerHTML = ""; // Limpia cualquier mensaje anterior
  
        for (let campo in errores) {
          let li = document.createElement("li");
          li.style.color = "red";
          li.style.fontSize = "13px";
          li.innerText = errores[campo];
          ulErrores.appendChild(li);
        }
      }
    });
  });
  */