
// Sorting Js
document.addEventListener("DOMContentLoaded", () => {
  const sortingDropdown = document.getElementById("DefaultSorting");
  const productsContainer = document.querySelector(".row.mb-5.text-center");
  const products = Array.from(productsContainer.children);

  const sortProducts = (criteria) => {
    const sortedProducts = [...products];
    if (criteria === "popularity") {
      sortedProducts.sort((a, b) => b.dataset.popularity - a.dataset.popularity);
    } else if (criteria === "latest") {
      sortedProducts.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
    } else if (criteria === "low-to-high") {
      sortedProducts.sort((a, b) => a.dataset.price - b.dataset.price);
    } else if (criteria === "high-to-low") {
      sortedProducts.sort((a, b) => b.dataset.price - a.dataset.price);
    }
    productsContainer.innerHTML = "";
    sortedProducts.forEach((product) => productsContainer.appendChild(product));
  };

  sortingDropdown.addEventListener("change", (e) => {
    sortProducts(e.target.value);
  });
});




//Add to card Feature
let cart = [];
let cartTotalCount = 0;

// Function to open the product modal
function openProductModal(name, price, image) {
  document.getElementById('productModalName').innerText = name;
  document.getElementById('productModalPrice').innerText = price;
  document.getElementById('productModalImage').src = image;
  document.getElementById('quantity').value = 1;
  document.getElementById('modalTotalPrice').innerText = price;
  const modal = new bootstrap.Modal(document.getElementById('productModal'));
  modal.show();
}

// Update total price when quantity changes
document.getElementById('quantity').addEventListener('input', function() {
  const price = parseFloat(document.getElementById('productModalPrice').innerText);
  const quantity = parseInt(this.value) || 1;
  document.getElementById('modalTotalPrice').innerText = (price * quantity).toFixed(2);
});

// Add product to cart
document.getElementById('addToCartButton').addEventListener('click', function() {
  const name = document.getElementById('productModalName').innerText;
  const price = parseFloat(document.getElementById('productModalPrice').innerText);
  const quantity = parseInt(document.getElementById('quantity').value) || 1;

  let existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity; // If the product is already in the cart, increase the quantity
  } else {
    cart.push({ name, price, quantity });
  }

  updateCartCount();
  renderCartItems();
  const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
  modal.hide();
});

// Update cart count in navbar
function updateCartCount() {
  cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').innerText = cartTotalCount;

  const emptyCartMessage = document.getElementById('empty-cart-message');
  if (cartTotalCount === 0) {
    emptyCartMessage.style.display = 'block';  // Show message if cart is empty
  } else {
    emptyCartMessage.style.display = 'none';   // Hide message when cart has items
  }
}

// Render cart items in the cart modal
function renderCartItems() {
  const cartItems = document.getElementById('cart-items');
  const cartTotalPrice = document.getElementById('cart-total-price');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `${item.name} - $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}
      <button class="btn btn-danger btn-sm" onclick="removeOneFromCart(${index})">Remove 1</button>
      <button class="btn btn-danger btn-sm ms-2" onclick="removeFromCart(${index})">Remove All</button>`;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotalPrice.innerText = total.toFixed(2);
}

// Remove one quantity of the item from the cart
function removeOneFromCart(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  updateCartCount();
  renderCartItems();
}

// Remove the entire item from the cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCartItems();
}

// Show "Your cart is already empty" message when cart modal is opened
document.getElementById('cartModal').addEventListener('show.bs.modal', function() {
  if (cartTotalCount === 0) {
    const emptyCartMessage = document.getElementById('empty-cart-message');
    emptyCartMessage.style.display = 'block';  // Show the empty cart message
  }
});