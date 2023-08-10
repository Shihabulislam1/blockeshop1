'use strict'

// For sticky navbar
const mainHeader = document.querySelector(".main-header");

// Function to handle scroll event
function handleScroll() {
  if (window.pageYOffset === 0) {
    // Remove the sticky class when scrolled back to the top
    mainHeader.classList.remove("sticky");
  } else {
    // Add the sticky class when scrolled down
    mainHeader.classList.add("sticky");
  }
}

// Add scroll event listener
window.addEventListener("scroll", handleScroll);

// // Function to initialize the cart modal
function initCartModal() {
  // Get all "Add to Bag" buttons after rendering the products
  const addToBagButtons = document.querySelectorAll(".product-bag");

  // Get the modal element
  const modal = document.querySelector(".cart-product-modal-container");

  // Get the gray background overlay element
  const overlay = document.querySelector(".modal-overlay");

  // Get the close icon and Cancel in the modal header
  const closeIcon = document.querySelector(".cart-product-modal-icon");
  const cancelModalButton = document.querySelector(".cancel-modal-button");
  let productId = '';

  // Add event listener to each "Add to Bag" button
  addToBagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get the corresponding product details
      const productCard = button.closest(".product-card");
      productId = productCard.id; // Get the product ID
      const productImgSrc = productCard.querySelector(".product-img img").src;
      const productTitle =
        productCard.querySelector(".product-title").textContent;
      const productPrice = productCard.querySelector(
        ".product-price span"
      ).textContent;

      // Update the modal with the product details
      const modalImg = modal.querySelector(".cart-product-img img");
      const modalTitle = modal.querySelector(".cart-product-title p");
      modalImg.src = productImgSrc;
      modalTitle.textContent = productTitle;
      const modalPrice = modal.querySelector(".cart-product-price span");
      modalPrice.textContent = productPrice;

      // Display the modal and the gray background overlay
      modal.style.display = "flex";
      overlay.style.display = "block";
      document.body.classList.add("modal-open");
    });
  });

  // Add event listener to close the modal when the close icon is clicked
  if (closeIcon) {
    closeIcon.addEventListener("click", () => {
      modal.style.display = "none";
      overlay.style.display = "none";
      document.body.classList.remove("modal-open");
    });
  }

  // Add event listener to cancel-modal-button the modal when the close icon is clicked
  if (cancelModalButton) {
    cancelModalButton.addEventListener("click", () => {
      modal.style.display = "none";
      overlay.style.display = "none";
      document.body.classList.remove("modal-open");
    });
  }

  // Add event listener to the "Add to Bag" button inside the modal
  const addToModalBagButtons = document.querySelector(".add-product-bag");
  if (addToModalBagButtons) {
    addToModalBagButtons.addEventListener("click", () => {
      // Get the selected product details
      // Selecting the necessary elements
      const priceElement = document.querySelector(
        ".cart-product-title .cart-product-price span"
      );
      const titleElement = document.querySelector(".cart-product-title p");
      const quantityElement = document.querySelector(
        ".cart-product-quantity .input-field"
      );
      const sizeSelectors = document.querySelectorAll(".size-selector");
      const imageElement = document.querySelector(".cart-product-img img");

      let priceBag = 0;
      let titleBag = "";
      let quantityBag = 0;
      let sizeBag = "";
      let imageBag = "";

      // Extracting the values
      if (priceElement) {
        priceBag = parseInt(priceElement.textContent);
      }
      if (titleElement) {
        titleBag = titleElement.textContent.trim();
      }
      if (quantityElement) {
        quantityBag = parseInt(quantityElement.value);
      }
      if (sizeSelectors) {
        sizeSelectors.forEach((selector) => {
          if (selector.classList.contains("selected")) {
            sizeBag = selector.dataset.size;
          }
        });
      }
      if (imageElement) {
        imageBag = imageElement.getAttribute("src");
      }
      let product = {};

      if (!sizeBag) {
        const noSizeSelected = document.querySelector(".no-size-selected");
        noSizeSelected.style.display = "block";
        return;
      } else {
        product = {
          title: titleBag,
          id: productId,
          imgSrc: imageBag,
          price: priceBag,
          size: sizeBag,
          quantity: quantityBag,
        };
        updateCartNumber(1);
      }

      if (product !== null) {
        addToBag(product);
      }

      // Close modal
      if (modal) {
        modal.style.display = "none";
      }
      if (overlay) {
        overlay.style.display = "none";
      }
      if (document.body.classList.contains("modal-open")) {
        document.body.classList.remove("modal-open");
      }
    });
  }

  // ... (Previous JavaScript code)

// Update the event listener for the product links
const productLinks = document.querySelectorAll(".product-link");
productLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    const productId = link.dataset.productId; // Get the product ID from the data attribute

    // Store the product ID in localStorage so it can be accessed on the product_details.html page
    localStorage.setItem("selectedProductId", productId);

    // Navigate to the product details page
    // const productDetailsLink = document.getElementsByClassName("product-link");
    // productDetailsLink.click();
    window.location.href = `product-details.html?id=${productId}`;
  });
});

// ... (Remaining JavaScript code)

}



function addToBag(product) {
  let bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];
  bagItems.push(product);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));

  updateBag();
}

function resolveRelativeUrl(relativeUrl) {
  const img = new Image();
  img.src = relativeUrl;
  return img.src;
}

function updateBag() {
  const bagContainer = document.querySelector(".bag-items");
  const bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];
  bagContainer.innerHTML = "";

  bagItems.forEach((item, index) => {
    // Convert relative image path to absolute path using the resolveRelativeUrl function
    // const absoluteImgSrc = resolveRelativeUrl(item.imgSrc);
    const bagItemHTML = `
    <div class="bag-item">
        
        <div class="bag-item-content-wrapper">
            <div class="bag-item-img">
              <img src="${item.imgSrc}" alt="Product Image">
            </div>
            <div class="bag-item-details">
              <h3 class="bag-item-title">${item.title}</h3>
              <p class="bag-item-size">Size: ${item.size}</p>
              <p class="bag-item-quantity">Quantity: ${item.quantity}</p>
              <p class="bag-item-price">Price:৳ ${item.price}</p>
            </div>
        </div>
        <div class="bag-item-footer">
            <div class="bag-item-subtotal">
              <p>Subtotal:&nbsp</p>
              <span class="bag-item-subtotal-num">৳ <span>${
                item.quantity * item.price
              }</span></span>
            </div>
              <div class="bag-item-delete">
                  Delete
              </div>
        </div>
    </div>
  `;

    bagContainer.innerHTML += bagItemHTML;
  });
  // Add event listener to the delete button of each bag item
  const deleteButtons = document.querySelectorAll(".bag-item-delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = parseInt(button.dataset.index);
      deleteItem(index);
      updateCartNumber(-1);
    });
  });

  // Updating Cart Total
  const totalElement = document.querySelector(".bag-total-price");
  const total = calculateTotal();

  totalElement.textContent = total;
}
// Update the cart total function
function calculateTotal() {
  const subtotalElements = document.querySelectorAll(
    ".bag-item-subtotal-num span"
  );
  let total = 0;

  subtotalElements.forEach((element) => {
    const subtotal = parseInt(element.textContent);
    total += subtotal;
  });

  return total;
}

// Delete Product from CArt
function deleteItem(index) {
  const bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];
  bagItems.splice(index, 1);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  updateBag();
  function reloadPage() {
    location.reload();
  }
  reloadPage();
}

// Call updateBag() when the page loads
window.addEventListener("DOMContentLoaded", () => {
  initCartModal();
  updateBag();
});

/*--------------------------------------------- */
// Update the bag icon with number in the header

document.addEventListener("DOMContentLoaded", function () {
  const cartNumberBadge = document.querySelector(".cart-number-badge");

  // Check if any items are stored in localStorage
  let bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];

  // Update the cart span number with the count of products
  function updateCartNumber() {
    const cartNumber = bagItems.length;
    cartNumberBadge.textContent = cartNumber;
  }

  updateCartNumber();
});

// Function to update the cart number dynamically
// Function to update the cart number dynamically
function updateCartNumber(change) {
  const cartNumberBadge = document.querySelector(".cart-number-badge");
  const currentCount = parseInt(cartNumberBadge.textContent);
  const newCount = currentCount + change;
  cartNumberBadge.textContent = newCount;
}

// Shopping Cart Offcanvas
const toggleButton = document.getElementById("toggle-offcanvas");
const offcanvas = document.getElementById("offcanvasRight");
const closeOffcanvas = document.getElementById("close-offcanvas");
const body = document.body;

toggleButton.addEventListener("click", () => {
  offcanvas.classList.toggle("show");
  body.classList.toggle("modal-open");
});

closeOffcanvas.addEventListener("click", () => {
  offcanvas.classList.remove("show");
  body.classList.remove("modal-open");
});

// Selecting XXXL Size and making it 48
// Get all the td elements inside the table
const tdElements = document.querySelectorAll(".custom-table tbody td");
// Loop through the td elements to find the cell with the content "44" and update it to "48"
if (tdElements) {
  tdElements.forEach((td) => {
    if (td.textContent.trim() === "44") {
      td.textContent = "48";
    }
  });
}


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
    <div class="product-item-checkout" id="${item.id}">
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



// Function to send data to the server
async function sendDataToServer(data) {
  try {
    const response = await fetch('https://server231.cyclic.app/api/v1/order/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      sessionStorage.setItem('orderResponse', JSON.stringify(responseData)); // Save response data in sessionStorage
      console.log('Response from server:', responseData); // Log the response data
      // alert('Order placed successfully!'); // Show success message
      localStorage.removeItem('bagItems'); // Clear the cart after successful order
      window.location.href = 'confirm.html'; // Redirect to home page after successful order
    } else {
      console.log('Error response from server:', response.status);
      alert('Error placing order. Please try again later.'); // Show error message
    }
  } catch (error) {
    console.error('Error sending data to server:', error);
    alert('Error placing order. Please try again later.'); // Show error message
  }
}


// Function to handle the form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the form from submitting in the default way

  // Get the data from the form
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const district = document.getElementById('district').value;
  const shippingFee = parseFloat(document.getElementById('shipping-price-i').textContent);
  const total = parseFloat(document.getElementById('total-price').textContent);
  const payable = parseFloat(document.getElementById('payable').textContent);

  // Get cart items from localStorage
  const cartItems = getLocalStorageData();
  const orderItems = cartItems.map(item => ({
    itemId: item.id,
    size: item.size,
    quantity: item.quantity,
    price: item.price*item.quantity,
  }));
  // Create the data object to be sent to the server
  const dataToSend = {
    user:{
      name: username,
      email: email,
      phone: phone,
      address: address,
      city: district,
      shippingFee: shippingFee,  
    },
    orderItems: orderItems, // Add the cart items array to the data object
    paymentDetails: 'cashon',
    totalAmount:payable,
    orderQuantity:orderItems.reduce((total, item) => total + item.quantity, 0),
  };

  // Call the function to send data to the server
  sendDataToServer(dataToSend);
}

// Add event listener to the form for form submission
document.getElementById('checkout-form').addEventListener('submit', handleFormSubmit);
