const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Display products
function displayProducts() {
  productList.innerHTML = "";

  products.forEach(function (product) {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button data-id="${product.id}">Add to Cart</button>
    `;

    productList.appendChild(li);
  });
}

// Display cart
function displayCart() {
  cartList.innerHTML = "";

  cart.forEach(function (product) {
    const li = document.createElement("li");

    li.textContent = `${product.name} - $${product.price}`;

    cartList.appendChild(li);
  });
}

// Add product to cart
productList.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const productId = Number(event.target.dataset.id);

    const product = products.find(function (item) {
      return item.id === productId;
    });

    cart.push(product);

    sessionStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
  }
});

// Clear cart
clearCartBtn.addEventListener("click", function () {
  cart = [];

  sessionStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
});

// Initial display
displayProducts();
displayCart();