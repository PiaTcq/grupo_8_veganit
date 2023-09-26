// Lista de todos los contenedores de los productos 
let productsList = document.querySelectorAll(".plato-caja");
let rowProduct = document.querySelector(".rowProduct");

// Variable de arreglo de productos (los productos seleccionados para el carrito)
let allProducts = [];
let valorTotal = document.querySelector(".total")

// Función para mostrar HTML
let showHTML = () => {
  //let rowProduct = document.querySelector(".rowProduct");
  rowProduct.innerHTML = '';

  let total= 0;

  allProducts.forEach(product => {
    let containerProduct = document.createElement("div");
    containerProduct.classList.add("caja");

    containerProduct.innerHTML = `
      <h1 class="p">${product.title}</h1>
      <h2>${product.price}</h2>
      <h3>cantidad: ${product.quantity}</h3>
      <h4 class="borrar"> borrar producto </h4>
    `;
   /* containerProduct.innerHTML = `
  <h1 class="nombrePlato">${product.title}</h1>
  <h2>${product.price}</h2>
  <h3>cantidad: ${product.quantity}</h3>
  <h4 class="borrar">borrar producto</h4>
`;*/


    rowProduct.appendChild(containerProduct);

    total = total + parseInt(product.quantity * product.price.slice(1))
  })
    valorTotal.innerText = `$${total}`
};

// Agrega el event listener al contenedor principal que envuelve todos los elementos .plato-caja
let productsListContainer = document.querySelector(".container"); // Asegúrate de que este selector coincida con tu estructura
productsListContainer.addEventListener("click", e => {
  if (e.target.classList.contains("añadir")) {
    let product = e.target.parentElement.parentElement;
    

    let infoProduct = {
      quantity: 1,
      title: product.querySelector(".nombrePlato").textContent,
      price: product.querySelector(".precio").textContent
    };

    let exists = allProducts.some(product => product.title === infoProduct.title)
    
    if(exists){
      let products = allProducts.map(product => {
        if(product.title === infoProduct.title){
         product.quantity++;
         return product
        }else{
          return product
        }
      })
      allProducts = [...allProducts]
    }else{
      allProducts = [...allProducts, infoProduct];
    }

    
    showHTML();
  }

  
});

rowProduct.addEventListener("click", (e) => {
  if (e.target.classList.contains("borrar")) {
    const product = e.target.parentElement;
    const title = product.querySelector(".p").textContent;

    
    const productIndex = allProducts.findIndex((product) => product.title === title);

    if (productIndex !== -1) {
      
      allProducts[productIndex].quantity--;

      
      if (allProducts[productIndex].quantity === 0) {
        allProducts.splice(productIndex, 1);
      }

      showHTML();
    }
  }
});

let productRow = document.querySelector(".product-row");
productRow.addEventListener("click", (e) => {
  let comprar = document.getElementById("comprar")
  if (comprar) {
    
    alert("gracias por su compra :)");
  }
});

