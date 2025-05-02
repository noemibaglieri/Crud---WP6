const param = new URLSearchParams(window.location.search);
const productId = param.get("productId");

window.onload = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0N2RkYzFjMjUwNDAwMTUxYWI2NWMiLCJpYXQiOjE3NDYxNzM0MDQsImV4cCI6MTc0NzM4MzAwNH0.9mfygF0buvg5FEjuqwCMCBJk6YoVYsY2hEEgnGBZGVM",
    },
  })
    .then((resp) => resp.json())
    .then((product) => {
      const productDetailsContainer = document.getElementById("product-details");

      const productImage = document.createElement("img");
      productImage.src = product.imageUrl;

      const productTitle = document.createElement("h1");
      productTitle.innerText = product.name;

      const productBrand = document.createElement("p");
      productBrand.innerText = product.brand;

      const productDesc = document.createElement("p");
      productDesc.innerText = product.description;

      const productPrice = document.createElement("p");
      productPrice.innerText = product.price;

      productDetailsContainer.appendChild(productImage);
      productDetailsContainer.appendChild(productTitle);
      productDetailsContainer.appendChild(productBrand);
      productDetailsContainer.appendChild(productDesc);
      productDetailsContainer.appendChild(productPrice);
    })
    .catch((error) => console.log(error));
};
