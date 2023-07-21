// Header Search Option Implementation

const searchIcon = document.getElementById("search-icon");
const searchModal = document.getElementById("search2-modal");
const closeButton2 = searchModal.querySelector(".close-search2");

let timerId;

searchIcon.addEventListener("click", openSearchModal);
searchIcon.addEventListener("mouseenter", openSearchModal);

function openSearchModal() {
  searchModal.style.display = "block";
  timerId = setTimeout(closeSearchModal, 10000);
}

function closeSearchModal() {
  searchModal.style.display = "none";
}

closeButton2.addEventListener("click", closeSearchModal);

window.addEventListener("click", (event) => {
  if (event.target === searchModal) {
    closeSearchModal();
  }
});

window.addEventListener("mousemove", resetTimer);

function resetTimer() {
  clearTimeout(timerId);
  timerId = setTimeout(closeSearchModal, 10000);
}

/*CART MODAL */

// Size Selection
const sizeSelectors = document.querySelectorAll(".size-selector");
const noSizeSelected = document.querySelector(".no-size-selected");

sizeSelectors.forEach((selector) => {
  selector.addEventListener("click", (event) => {
    const selectedSize = event.target.dataset.size;

    // Remove 'selected' class from all size selectors
    sizeSelectors.forEach((selector) => {
      selector.classList.remove("selected");
    });

    // Add 'selected' class to the clicked size selector
    event.target.classList.add("selected");

    // Show or hide the 'no size selected' message
    if (selectedSize) {
      noSizeSelected.style.display = "none";
    } else {
      noSizeSelected.style.display = "block";
    }
  });
});

// quantity-selection

const minusBtn = document.querySelector(".minus-btn");
const plusBtn = document.querySelector(".plus-btn");
const inputField = document.querySelector(".input-field");

minusBtn.addEventListener("click", decreaseNumber);
plusBtn.addEventListener("click", increaseNumber);
inputField.addEventListener("change", handleManualInput);

function decreaseNumber() {
  let currentValue = parseInt(inputField.value);
  if (currentValue > 0) {
    inputField.value = currentValue - 1;
  }
}

function increaseNumber() {
  let currentValue = parseInt(inputField.value);
  inputField.value = currentValue + 1;
}

function handleManualInput() {
  let currentValue = parseInt(inputField.value);
  if (isNaN(currentValue) || currentValue < 0) {
    inputField.value = 1;
  }
}

// Get all "Add to Bag" buttons
const addToBagButtons = document.querySelectorAll(".product-bag");

// Get the modal element
const modal = document.querySelector(".cart-product-modal-container");

// Get the gray background overlay element
const overlay = document.querySelector(".modal-overlay");

// Get the close icon and Cancel in the modal header
const closeIcon = document.querySelector(".cart-product-modal-icon");
const cancelModalButton = document.querySelector(".cancel-modal-button");

// Add event listener to each "Add to Bag" button
addToBagButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the corresponding product details
    const productCard = button.closest(".product-card");
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

//// Check if any items are already stored in local storage
let bagItems = [];
if (localStorage.getItem("bagItems")) {
  bagItems = JSON.parse(localStorage.getItem("bagItems"));
}

const addToModalBagButtons = document.querySelector(".add-product-bag");
if (addToModalBagButtons) {
  addToModalBagButtons.addEventListener("click", () => {
    // GEt the selected product details
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

    // Extracting the values
    let priceBag = 0;
    let titleBag = "";
    let quantityBag = 0;
    let sizeBag = "";
    let imageBag = "";
    // Check if the elements exist before accessing their properties
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
        imgSrc: imageBag,
        price: priceBag,
        size: sizeBag,
        quantity: quantityBag,
      };
      updateCartNumber(1);
    }
    console.log(product);

    // addToBag(product);
    if (product !== null) {
      addToBag(product);
    }

    //Close modal
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

/*--------------------------------------------- */
// For Product Page -Individual Product
const addToModalBagButtons2 = document.querySelector(".product-page-bag");
if (addToModalBagButtons2) {
  addToModalBagButtons2.addEventListener("click", () => {
    // GEt the selected product details
    // Selecting the necessary elements
    const priceElement2 = document.querySelector(
      ".product-details .detailsCard .title-price .product-price-p span"
    );
    const titleElement2 = document.querySelector(
      ".product-details .detailsCard .title-price .product-title-p"
    );
    const quantityElement2 = document.querySelector(
      ".quantity-selection .input-field"
    );
    const sizeSelectors2 = document.querySelectorAll(".size-selector");
    const imageElement2 = document.querySelector(".product-details-img img");
    let priceBag2 = 0;
    let titleBag2 = "";
    let quantityBag2 = 0;
    let sizeBag2 = "";
    let imageBag2 = "";
    // Extracting the values
    if (priceElement2) {
      priceBag2 = parseInt(priceElement2.textContent);
    }
    if (titleElement2) {
      titleBag2 = titleElement2.textContent.trim();
    }
    if (quantityElement2) {
      quantityBag2 = parseInt(quantityElement2.value);
    }
    if (sizeSelectors2) {
      sizeSelectors2.forEach((selector) => {
        if (selector.classList.contains("selected")) {
          sizeBag2 = selector.dataset.size;
        }
      });
    }
    if (imageElement2) {
      imageBag2 = imageElement2.getAttribute("src");
    }
    let product = {};

    if (!sizeBag2) {
      const noSizeSelected = document.querySelector(".no-size-selected");
      noSizeSelected.style.display = "block";
      return;
    } else {
      product = {
        title: titleBag2,
        imgSrc: imageBag2,
        price: priceBag2,
        size: sizeBag2,
        quantity: quantityBag2,
      };
      updateCartNumber(1);
    }

    // addToBag(product);
    if (product !== null) {
      addToBag(product);
    }
  });
}

function addToBag(product) {
  let bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];
  bagItems.push(product);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));

  updateBag();
}

function updateBag() {
  const bagContainer = document.querySelector(".bag-items");
  const bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];

  bagContainer.innerHTML = "";

  bagItems.forEach((item, index) => {
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
}

// Call updateBag() when the page loads
window.addEventListener("DOMContentLoaded", () => {
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
