//window.addEventListener("DOMContentLoaded", function(){

 
    


    

    
    //let rowProduct= document.getElementById("caja")


    //lista de todos los contenedores de los productos 
    let productsList = document.querySelector(".plato-caja")

    //variable de arreglos de productos(los productos que selecciono para el carrito)
    let allProducts = [];

    //función para mostrar html
   

    productsList.addEventListener("click", e=>{
       if(e.target.classList.contains("añadir")){
        let product = e.target.parentElement.parentElement
       

        let infoProduct = {
            quantity: 1,
            title: product.querySelector("h4").textContent,
            price: product.querySelector("h5").textContent/*,
            image: product.querySelector("h4").textContent*/
        }

        

        let showHTML = ()=>{
          let rowProduct= document.querySelector(".rowProduct")

          rowProduct.innerHTML='';
          
        allProducts.forEach(product => {
            let containerProduct = document.createElement("div")
            containerProduct.classList.add("caja");
    
            containerProduct.innerHTML = `
            
              <h4>Aca irá la imagen xd</h4>
              <h1>${product.title}</h1>
              <h2>${product.price}</h2>
              <h3>cantidad: ${product.quantity}</h3>
            
          `
           //console.log(rowProduct)
    
          rowProduct.append(containerProduct)
    
        })
    }
        //console.log(infoProduct)
        allProducts = [...allProducts, infoProduct]
        showHTML();

        
       

       }
       //console.log(allProducts)

    })

    


//})
