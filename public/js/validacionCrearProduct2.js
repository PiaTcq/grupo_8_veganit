window.addEventListener("load",function(){

    let formulario = document.getElementById("formulario");

    formulario.addEventListener("submit",function(event){

        
        event.preventDefault();

        let nombre = document.getElementById("nombre");
        let precio = document.getElementById("precio");
        let descripcion = document.getElementById("descripcion");
        let fecha = document.querySelector("fecha");
        let p1 = document.getElementById("p1");
        let p2 = document.getElementById("p2");
        let p3 = document.getElementById("p3");
        let p4 = document.getElementById("p4");

        
        let c = 0;

        if(!(nombre.value)){
            p1.innerText = "¡Debes completar el campo nombre!"
            c=1
        }
        if(!(precio.value)){
            p2.innerText = "¡Debes completar el campo precio!"
            c=1
        }
        if(!(descripcion.value)){
            p3.innerText = "¡Debes poner una descripción!"
            c=1
        }
        if(!(fecha.value)){
            p4.innerText = "¡Debes completar la fecha!"
            c=1
        }
        if(c==1){
            return;
        }
        
        formulario.submit()
        

        

    })
})