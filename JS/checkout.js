// Function to retrieve cart items from localStorage
function getCartItems() {
    const cartItemsString = localStorage.getItem('bagItems');
    return cartItemsString ? JSON.parse(cartItemsString) : [];
  }

  // Function to render product information on the checkout page
// Function to render product information on the checkout page
function renderCheckoutPage() {
const cartItems = getCartItems();
const productContainer = document.getElementById('product-list');
const totalPriceSpan = document.getElementById('total-price');
let totalPrice = 0;

if (cartItems.length === 0) {
  productContainer.innerHTML = `<p class="no-item">No items in the cart.</p>`;
  totalPriceSpan.textContent = "0.00"; // Display zero total price when cart is empty
} else {
  productContainer.innerHTML = cartItems.map((item, index) => `
    <div class="product-item-checkout">
        <p class="checkout-title">${item.title}</p>
        <div class="checkout-prod-container">
      <img class="checkout-img" src="${item.imgSrc}" alt="${item.title}">
      <div class="checkout-info-prod">
      <p>Price: ৳<span>${item.price}</span></p>
      <p>Size: <span>${item.size}</span></p>
      <p>Quantity: <span>${item.quantity}</span></p>
      <button class=" btn btn-danger" onclick="removeItem(${index})">Delete</button>
      </div>
      </div>
    </div>
  `).join('');

  totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  totalPriceSpan.textContent =totalPrice.toFixed(2);
}
}


 // Function to remove a specific item from the cart
function removeItem(index) {
    const cartItems = getCartItems();
    cartItems.splice(index, 1);
    localStorage.setItem('bagItems', JSON.stringify(cartItems));
    renderCheckoutPage();
    location.reload(); // Reload the page after removing the item
  }
  

  // Function to clear the cart and remove items from localStorage
  function clearCart() {
    localStorage.removeItem('bagItems');
    renderCheckoutPage();
  }

  // Call the renderCheckoutPage function on page load
  renderCheckoutPage();

//   calculating payable price
  let payable=document.getElementById('payable');
   
  let totalPrice2=document.getElementById('total-price').textContent;
    totalPrice2=parseFloat(totalPrice2);
  let shppingCharge=document.getElementById('shipping-price-i').textContent;
    shppingCharge=parseFloat(shppingCharge);
    let  payablePrice=totalPrice2+shppingCharge;
    payable.textContent=payablePrice.toFixed(2);
  

// For payment breakdown
 let breakdownPayable=document.querySelector('.b-total span');
    breakdownPayable.textContent=payablePrice.toFixed(2);
 let purposeTotal=document.querySelector('.b-purpose-total span');
   purposeTotal.textContent=totalPrice2.toFixed(2);
 let purposeShipping=document.querySelector('.b-ship-total span');
    purposeShipping.textContent=shppingCharge.toFixed(2);