const newArrivals = [
  {
    image: "images/nail-polish.webp",
    alt: "product img",
    title: "Nail Polish",
    price: "Rs. 2,599"
  },
  {
    image: "images/foundation.webp",
    alt: "product img",
    title: "BB Cream",
    price: "Rs. 2,599"
  },
  {
    image: "images/Mascara.webp",
    alt: "product img",
    title: "Drama Lash Limited Edition",
    price: "Rs. 1,299"
  },
  {
    image: "images/foundation 2.webp",
    alt: "product img",
    title: "ULTRA WEAR FOUNDATION",
    price: "Rs. 3,699"
  }
];

// Update cart count badge function
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

// Display Products with dynamic buttons
function displayProducts() {
  const row = document.getElementById("productRow");
  row.innerHTML = "";

  newArrivals.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-3 mb-4";

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItem = cart.find(item => item.title === product.title);

    if (cartItem) {
      const isZero = cartItem.quantity === 0;
      col.innerHTML = `
        <div class="product-card h-100 border p-2 text-center shadow-sm">
          <img src="${product.image}" alt="${product.alt}" class="img-fluid mb-2">
          <div class="card-content">
            <h3>${product.title}</h3>
            <p>${product.price}</p>
          </div>
          <div class="quantity-controls d-flex justify-content-center align-items-center gap-2">
            <button class="btn btn-danger btn-sm decrease-qty" ${isZero ? "disabled" : ""}>-</button>
            <span class="qty">${cartItem.quantity}</span>
            <button class="btn btn-success btn-sm increase-qty">+</button>
          </div>
        </div>
      `;
    } else {
      col.innerHTML = `
        <div class="product-card h-100 border p-2 text-center shadow-sm">
          <img src="${product.image}" alt="${product.alt}" class="img-fluid mb-2">
          <div class="card-content">
            <h3>${product.title}</h3>
            <p>${product.price}</p>
          </div>
          <button class="btn btn-dark add-to-cart-btn">Add to cart</button>
        </div>
      `;
    }

    row.appendChild(col);
  });
}

// Cart Logic with quantity buttons
function setupCartLogic() {
  document.addEventListener("click", function (e) {
    const target = e.target;

    if (target.classList.contains("add-to-cart-btn")) {
      const title = target.parentElement.querySelector("h3").textContent;
      const product = newArrivals.find(p => p.title === title);

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(item => item.title === product.title);

      if (!existing) {
        cart.push({ ...product, quantity: 0 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      displayProducts();
    }

    // Increase quantity
    else if (target.classList.contains("increase-qty")) {
      const card = target.closest(".product-card");
      const title = card.querySelector("h3").textContent;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const item = cart.find(i => i.title === title);

      if (item) {
        item.quantity += 1;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      displayProducts();
    }

    // Decrease quantity
    else if (target.classList.contains("decrease-qty")) {
      const card = target.closest(".product-card");
      const title = card.querySelector("h3").textContent;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const itemIndex = cart.findIndex(i => i.title === title);

      if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 0) {
          cart[itemIndex].quantity -= 1;
          if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1);
          }
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        displayProducts();
      }
    }
  });
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  setupCartLogic();
  updateCartCount();
});
