'use strict'

// For sticky navbar
const mainHeader = document.querySelector('.main-header');

// Function to handle scroll event
function handleScroll() {
  if (window.pageYOffset === 0) {
    // Remove the sticky class when scrolled back to the top
    mainHeader.classList.remove('sticky');
  } else {
    // Add the sticky class when scrolled down
    mainHeader.classList.add('sticky');
  }
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);


  // For Card Slider
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        // dynamicBullets:true,
      },
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      
      },
      breakpoints: {
        350:{
          slidesPerView: 1,
          spaceBetween: 15,
        },
        // When window width is <= 767px
        767: {
          slidesPerView: 1,
        },
        // When window width is <= 991px
        991: {
          slidesPerView: 2,
        },
        // When window width is <= 1199px
        1400: {
          slidesPerView: 3,
        },
      },
    });
  











// CArt Size and Quantity
function showSize(value) {
  document.querySelector(".text-box").value = value;
}

let dropdownSize = document.querySelector(".dropdown-size");
dropdownSize.onclick = function () {
  dropdownSize.classList.toggle("active");
};

function showQuantity(value) {
  document.querySelector(".num-box").value = value;
}

let dropdownQuantity = document.querySelector(".quantity-selector");
dropdownQuantity.onclick = function () {
  dropdownQuantity.classList.toggle("active");
};



// SubTOtal and Cart Total

function showQuantity(value) {
  document.querySelector(".num-box").value = value;
  updateSubtotal(value);
  updateCartTotal();
}

function updateSubtotal(quantity) {
  const price = 685; // Get the product price from the HTML or calculate dynamically
  const subtotal = price * quantity;
  document.querySelector(".bag-subtotal-price").textContent = subtotal;
}

function updateCartTotal() {
  let subtotalElements = document.querySelectorAll(".bag-subtotal-price");
  let total = 0;
  subtotalElements.forEach((element) => {
    total += parseInt(element.textContent);
  });
  document.querySelector(".bag-total-price").textContent = total;
}



