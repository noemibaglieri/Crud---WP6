const backOfficeForm = document.getElementById("backoffice-form");

backOfficeForm.onsubmit = function (e) {
  e.preventDefault();

  const itemName = document.getElementById("item-name");
  const itemDescription = document.getElementById("item-description");
  const itemBrand = document.getElementById("item-brand");
  const itemImage = document.getElementById("item-image");
  const itemPrice = document.getElementById("item-price");

  const newItem = {
    name: itemName.value,
    description: itemDescription.value,
    brand: itemBrand.value,
    imageUrl: itemImage.value,
    price: itemPrice.value,
  };

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    body: JSON.stringify(newItem),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0N2RkYzFjMjUwNDAwMTUxYWI2NWMiLCJpYXQiOjE3NDYxNzM0MDQsImV4cCI6MTc0NzM4MzAwNH0.9mfygF0buvg5FEjuqwCMCBJk6YoVYsY2hEEgnGBZGVM",
    },
  }).then((resp) => {
    if (!resp.ok) {
      throw new Error("Fetch Error");
    }

    return resp.json();
  });
};
