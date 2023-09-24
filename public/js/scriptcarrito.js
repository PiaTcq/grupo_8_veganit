window.addEventListener("load", function(){
    let rowProduct= document.querySelector(".row-product")
    //lista de todos los contenedores de los productos 
    let productsList = document.querySelector(".plato-caja")

    //variable de arreglos de productos(los productos que selecciono para el carrito)
    let allProducts = [];

    //función para mostrar html
   let showHTML = ()=>{
    allProducts.forEach(product => {
        let containerProduct = document.createElement("div")
        containerProduct.classList.add("caja");

        containerProduct.innerHTML = `
        <div class="relleno">
          <h4>Aca irá la imagen xd</h4>
          <h1>${product.title}</h1>
          <h2>${product.price}</h2>
          <h3>cantidad: ${product.quantity}</h3>
        </div>
      `

      rowProduct.append(containerProduct)
    })
}

    productsList.addEventListener("click", e=>{
       if(e.target.classList.contains("añadir")){
        let product = e.target.parentElement.parentElement
       

        let infoProduct = {
            quantity: 1,
            title: product.querySelector("h4").textContent,
            price: product.querySelector("h5").textContent/*,
            image: product.querySelector("h4").textContent*/
        }
        //console.log(infoProduct)
        allProducts = [...allProducts, infoProduct]
        showHTML();
       }
       console.log(allProducts)

       
    })

    


})