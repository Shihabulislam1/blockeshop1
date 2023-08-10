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

const orderResponseJSON = sessionStorage.getItem('orderResponse');
const orderResponse = JSON.parse(orderResponseJSON);
console.log(orderResponse);
// if (orderResponse.success === "true") {
  // Get the user and orderItems data from the orderResponse
 
  
  confirmGenerate();

  if(orderResponse.payload.Order.status === "false"){
    const rejectOrderElement = document.querySelector(".reject-order");
    rejectOrderElement.style.display = "flex";
  }
  


function confirmGenerate(){


  const user = orderResponse.payload.Order.user;
  const orderItems = orderResponse.payload.Order.orderItems;

  // Create a table element
  const table = document.createElement("table");
  table.classList.add("order-table"); // Optional: Add a CSS class to style the table

  // Create table header
  const thead = table.createTHead();
  const headerRow = thead.insertRow();
  const headers = ["Product Name", "Size", "Quantity", "Price"];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  // Create table body
  const tbody = table.createTBody();
  orderItems.forEach((item) => {
    const row = tbody.insertRow();
    const data = [item.productName
        , item.size, item.quantity, item.price];
    data.forEach((text) => {
      const cell = row.insertCell();
      cell.textContent = text;
    });
  });

  // Create user information section
  const userInfo = document.createElement("div");
  userInfo.innerHTML = `
  <h2 class="subheading-confirm-user">User Information:</h2>
  <p><span>Name:</span>${user.name}</p>
  <p><span>Email:</span> ${user.email}</p>
  <p><span>Phone: </span>${user.phone}</p>
  <p><span>Address:</span> ${user.address}</p>
  <p><span>City:</span> ${user.city}</p>
  <p><span>Shipping Fee:</span>৳ ${user.shippingFee}</p>
  <p><span>Total:</span>৳ ${
    orderResponse.payload.Order.totalAmount
  }</p>
`;

  // Append the table and user information to a container element in your HTML
  const container = document.getElementById("order-container"); // Replace with your container ID
  container.appendChild(userInfo);
  container.appendChild(table);

}
// } else {
//   // Handle the case when orderResponse.success is not "true"
//   const rejectOrderElement = document.querySelector(".reject-order");
//   rejectOrderElement.style.display = "flex";
// }
