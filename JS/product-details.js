"use strict";

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
    // reloadPage();
  }
  
  // Call updateBag() when the page loads
  window.addEventListener("DOMContentLoaded", () => {
    // initCartModal();
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
  


// Function to render the product details page dynamically
function renderProductDetails(productData) {
    // Get the product details page container
    let productImage=document.querySelector(".product-details-img img");
    productImage.src=productData.imageUrl;
    productImage.alt=productData.name;
    productImage.id=`${productData._id}`;

    let productName=document.querySelector(".product-title-p");
    productName.textContent=productData.name;

    let productPrice=document.querySelector(".product-price-p span");
    productPrice.textContent=productData.price;

    let productDescription=document.querySelector(".product-dess-p");
    productDescription.textContent=productData.description;

  }
  
  // ... (Remaining JavaScript code)
  

  // product_details.js
document.addEventListener("DOMContentLoaded", () => {
    // Get the stored product ID from localStorage
    const productId = localStorage.getItem("selectedProductId");
  
    // Fetch the product details from the API using the product ID
    fetch(`https://server231.cyclic.app/api/v1/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        // Pass the product data to the renderProductDetails function to display them
        renderProductDetails(data.payload.product);
        console.log(data.payload.product);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  });
  