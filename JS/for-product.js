'use strict'

const addToBagButtons = document.querySelectorAll(".product-bag");
addToBagButtons.forEach((button) => {
  button.removeEventListener("click", handleAddToBag);
});

// Add new event listener to "Add to Bag" buttons
addToBagButtons.forEach((button) => {
  button.addEventListener("click", handleAddToBag);
});
// Function to handle "Add to Bag" button click
function handleAddToBag() {
  // Get the corresponding product details
  const productCard = this.closest(".product-card");
  const productId = productCard.id;
  const productImgSrc = productCard.querySelector(".product-img img").src;
  const productTitle = productCard.querySelector(".product-title").textContent;
  const productPrice = productCard.querySelector(".product-price span").textContent;

  // Update the modal with the product details
  const modal = document.querySelector(".cart-product-modal-container");
  const modalImg = modal.querySelector(".cart-product-img img");
  const modalTitle = modal.querySelector(".cart-product-title p");
  const modalPrice = modal.querySelector(".cart-product-price span");
  modalImg.src = productImgSrc;
  modalTitle.textContent = productTitle;
  modalPrice.textContent = productPrice;

  // Store the productId in a variable accessible to the addToModalBagButtons click event
  let productIdInModal = productId;

  // Display the modal and the gray background overlay
  modal.style.display = "flex";
  const overlay = document.querySelector(".modal-overlay");
  overlay.style.display = "block";
  document.body.classList.add("modal-open");

  // Get the "Add to Bag" button inside the modal and add the event listener
  const addToModalBagButton = document.querySelector(".add-product-bag");
  addToModalBagButton.addEventListener("click", () => {
    // Get the selected product details
    // Selecting the necessary elements
    const priceElement = document.querySelector(".cart-product-title .cart-product-price span");
    const titleElement = document.querySelector(".cart-product-title p");
    const quantityElement = document.querySelector(".cart-product-quantity .input-field");
    const sizeSelectors = document.querySelectorAll(".size-selector");
    const imageElement = document.querySelector(".cart-product-img img");

    // Rest of the code remains the same as before
    // ...
    
    let priceBag = 0;
    let titleBag = "";
    let quantityBag = 0;
    let sizeBag = "";
    let imageBag = "";
    // let idBag='';
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
        id: productIdInModal,
        imgSrc: imageBag,
        price: priceBag,
        size: sizeBag,
        quantity: quantityBag,
      };
      updateCartNumber(1); //located in product-page.js
    }

    if (product !== null) {
      addToBag(product);
    }

    // Close modal
    modal.style.display = "none";
    overlay.style.display = "none";
    document.body.classList.remove("modal-open");
  });
}
