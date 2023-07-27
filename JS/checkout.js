'use strict'

// Function to retrieve cart items from localStorage
function getCartItems() {
  const cartItemsString = localStorage.getItem("bagItems");
  return cartItemsString ? JSON.parse(cartItemsString) : [];
}

// Function to render product information on the checkout page
// Function to render product information on the checkout page
function renderCheckoutPage() {
  const cartItems = getCartItems();
  const productContainer = document.getElementById("product-list");
  const totalPriceSpan = document.getElementById("total-price");
  let totalPrice = 0;

  if (cartItems.length === 0) {
    productContainer.innerHTML = `<p class="no-item">No items in the cart.</p>`;
    totalPriceSpan.textContent = "0.00"; // Display zero total price when cart is empty
  } else {
    productContainer.innerHTML = cartItems
      .map(
        (item, index) => `
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
  `
      )
      .join("");

    totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    totalPriceSpan.textContent = totalPrice.toFixed(2);
  }
}

// Function to remove a specific item from the cart
function removeItem(index) {
  const cartItems = getCartItems();
  cartItems.splice(index, 1);
  localStorage.setItem("bagItems", JSON.stringify(cartItems));
  renderCheckoutPage();
  location.reload(); // Reload the page after removing the item
}

// Function to clear the cart and remove items from localStorage
function clearCart() {
  localStorage.removeItem("bagItems");
  renderCheckoutPage();
}

// Call the renderCheckoutPage function on page load
renderCheckoutPage();

function handleDistrictChange() {
  const selectedCity = document.getElementById("district").value;
  const shippingPrice = selectedCity === "Rajshahi" ? 0 : 70; // Set shipping fee to 0 for Rajshahi

  // Update the displayed shipping price and total payable amount
  document.getElementById("shipping-price-i").textContent = shippingPrice;
  const totalPrice = parseFloat(
    document.getElementById("total-price").textContent
  );
  document.getElementById("payable").textContent = (
    totalPrice + shippingPrice
  ).toFixed(2);
}

// Add event listener to the district select element
document
  .getElementById("district")
  .addEventListener("change", handleDistrictChange);

// Call the handleDistrictChange function on page load to set the initial shipping fee
handleDistrictChange();

// Function to calculate payable price and update the elements
function calculatePayablePrice() {
  let totalPrice2 = parseFloat(
    document.getElementById("total-price").textContent
  );
  let shippingCharge = parseFloat(
    document.getElementById("shipping-price-i").textContent
  );
  let payablePrice = totalPrice2 + shippingCharge;

  // For payable price display
  let payable = document.getElementById("payable");
  payable.textContent = payablePrice.toFixed(2);

  // For payment breakdown display
  let breakdownPayable = document.querySelector(".b-total span");
  breakdownPayable.textContent = payablePrice.toFixed(2);

  let purposeTotal = document.querySelector(".b-purpose-total span");
  purposeTotal.textContent = totalPrice2.toFixed(2);

  let purposeShipping = document.querySelector(".b-ship-total span");
  purposeShipping.textContent = shippingCharge.toFixed(2);
}

// Add event listener to the district select element to recalculate payable price on change
document
  .getElementById("district")
  .addEventListener("change", calculatePayablePrice);

// Call the calculatePayablePrice function on page load to set the initial payable price
calculatePayablePrice();



//   Disable the button when the checkbox is unchecked.
//   When "Bkash" is selected and then "Cash on Delivery" is selected, restore the button to its original state as "Confirm Order."

document.addEventListener("DOMContentLoaded", function () {
  const bkashRadio = document.getElementById("bkash");
  const cashOnDeliveryRadio = document.getElementById("cod");
  const checkoutCheckbox = document.getElementById("checkout-checkbox");
  const confirmBtn = document.getElementById("confirm-btn");

  function updateButtonTextAndState() {
    if (bkashRadio.checked) {
      confirmBtn.innerText = "Proceed to Payment";
    } else {
      confirmBtn.innerText = "Confirm Order";
    }
  }

  function disableButtonIfUnchecked() {
    if (!checkoutCheckbox.checked) {
      confirmBtn.disabled = true;
    } else {
      confirmBtn.disabled = false;
    }
  }

  function restoreOriginalState() {
    if (cashOnDeliveryRadio.checked) {
      confirmBtn.innerText = "Confirm Order";
      updateButtonTextAndState();
    } else if (bkashRadio.checked) {
      updateButtonTextAndState();
    }
  }

  // Call the function on page load to set the initial button text and state
  updateButtonTextAndState();

  // Add event listeners to the radio buttons for payment options and the checkbox for the checkout box
  bkashRadio.addEventListener("change", restoreOriginalState);
  cashOnDeliveryRadio.addEventListener("change", restoreOriginalState);
  checkoutCheckbox.addEventListener("change", () => {
    disableButtonIfUnchecked();
    updateButtonTextAndState();
  });
});









// Function to get the data from localStorage
function getLocalStorageData() {
  const data = JSON.parse(localStorage.getItem('bagItems'));
  return data ? data : [];
}

// Function to send data to the server/API
function sendDataToServer(formData) {
  // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint URL
  const apiEndpoint = 'api endpoint URL';

  // You can use fetch() or other AJAX methods to send data to the server
  fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the server response if needed
      console.log('Server response:', data);
    })
    .catch(error => {
      // Handle errors if any
      console.error('Error:', error);
    });
}

document.getElementById('checkout-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get form data
  const formData = new FormData(event.target);

  // Get the data from localStorage
  const localStorageData = getLocalStorageData();

  // Combine form data with localStorage data
  const combinedData = {
    formData: Object.fromEntries(formData),
    localStorageData
  };

  // Send the data to the server/API
  sendDataToServer(combinedData);

  // Clear localStorage after sending data if needed
  // localStorage.removeItem('bagItems');

  // Optionally, you can redirect to a thank-you page or show a success message
  window.location.href = 'confirm.html';
});
