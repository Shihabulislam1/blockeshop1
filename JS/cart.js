// // CArt Size and Quantity
// function showSize(value) {
//     document.querySelector(".text-box").value = value;
//   }
  
//   function showQuantity(value) {
//     document.querySelector(".num-box").value = value;
//   }
  
//   let dropdownQuantity = document.querySelector(".quantity-selector");
//   dropdownQuantity.onclick = function () {
//     dropdownQuantity.classList.toggle("active");
//   };
  
  
  
//   // SubTOtal and Cart Total
  
//   function showQuantity(value) {
//     document.querySelector(".num-box").value = value;
//     updateSubtotal(value);
//     updateCartTotal();
//   }
  
//   function updateSubtotal(quantity) {
//     const price = 685; // Get the product price from the HTML or calculate dynamically
//     const subtotal = price * quantity;
//     document.querySelector(".bag-subtotal-price").textContent = subtotal;
//   }
  
//   function updateCartTotal() {
//     let subtotalElements = document.querySelectorAll(".bag-subtotal-price");
//     let total = 0;
//     subtotalElements.forEach((element) => {
//       total += parseInt(element.textContent);
//     });
//     document.querySelector(".bag-total-price").textContent = total;
//   }
  





/* ----------------------------------------- */

// Check if any items are already stored in local storage


