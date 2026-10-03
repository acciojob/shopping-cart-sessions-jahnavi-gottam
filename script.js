const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Get cart from sessionStorage
function getCart() {
  const storedCart = sessionStorage.getItem("cart");

  if (storedCart) {
    return JSON.parse(storedCart);
  }

  return [];
}

// Save cart to sessionStorage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button 
        class="add-to-cart-btn" 
        data-id="${product.id}">
        Add to Cart
      </button>
    `;

    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";

  const cart = getCart();

  cart.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button 
        class="remove-from-cart-btn" 
        data-id="${product.id}">
        Remove
      </button>
    `;

    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const cart = getCart();

  const product = products.find(
    (product) => product.id === productId
  );

  if (!product) {
    return;
  }

  cart.push(product);

  saveCart(cart);

  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = getCart();

  cart = cart.filter(
    (product) => product.id !== productId
  );

  saveCart(cart);

  renderCart();
}

// Clear cart
function clearCart() {
  saveCart([]);

  renderCart();
}

// Add to cart event
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = Number(event.target.dataset.id);

    addToCart(productId);
  }
});

// Remove from cart event
cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = Number(event.target.dataset.id);

    removeFromCart(productId);
  }
});

// Clear cart event
clearCartBtn.addEventListener("click", clearCart);

// Initial page load
renderProducts();
renderCart();