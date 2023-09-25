// Lista de todos los contenedores de los productos 
let productsList = document.querySelectorAll(".plato-caja");

// Variable de arreglo de productos (los productos seleccionados para el carrito)
let allProducts = [];

// Función para mostrar HTML
let showHTML = () => {
  let rowProduct = document.querySelector(".rowProduct");
  rowProduct.innerHTML = '';

  allProducts.forEach(product => {
    let containerProduct = document.createElement("div");
    containerProduct.classList.add("caja");

    containerProduct.innerHTML = `
      <h1>${product.title}</h1>
      <h2>${product.price}</h2>
      <h3>cantidad: ${product.quantity}</h3>
    `;

    rowProduct.appendChild(containerProduct);
  })
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

    allProducts = [...allProducts, infoProduct];
    showHTML();
  }
});
