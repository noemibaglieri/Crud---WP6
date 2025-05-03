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

      const productImage = document.getElementById("product-image");
      productImage.src = product.imageUrl;
      productImage.className = "rounded-3";
      productImage.style.width = "100%";

      const productTitle = document.getElementById("product-title");
      productTitle.innerText = product.name;

      const productBrand = document.getElementById("product-brand");
      productBrand.innerText = product.brand;
      productBrand.className = "flo-primary-color fw-bold d-inline-block";

      const productDesc = document.getElementById("product-description");
      productDesc.innerText = product.description;

      const productPrice = document.getElementById("product-price");
      productPrice.innerText = product.price + "€";

      productDetailsContainer.appendChild(productTitle);
      productDetailsContainer.appendChild(productBrand);
      productDetailsContainer.appendChild(productDesc);
      productDetailsContainer.appendChild(productPrice);
    })
    .catch((error) => console.log(error));
};
