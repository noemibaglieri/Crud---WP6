const param = new URLSearchParams(window.location.search);
const productId = param.get("productId");
const URL = productId ? "https://striveschool-api.herokuapp.com/api/product/" + productId : "https://striveschool-api.herokuapp.com/api/product/";
const method = productId ? "PUT" : "POST";
const delBtn = document.getElementById("delete-button");
const uploadBtn = document.getElementById("upload-button");

const backOfficeForm = document.getElementById("backoffice-form");

// il metodo DELETE non ha bisogno di altre informazioni,
// se linkato ad un URL con id, come in questo caso
delBtn.onclick = function () {
  fetch(URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0N2RkYzFjMjUwNDAwMTUxYWI2NWMiLCJpYXQiOjE3NDYxNzM0MDQsImV4cCI6MTc0NzM4MzAwNH0.9mfygF0buvg5FEjuqwCMCBJk6YoVYsY2hEEgnGBZGVM",
    },
  }).then((resp) => {
    if (resp.ok) {
      alert("You permantly deleted the product " + productId);
      window.location.assign("./index.html");
    }
  });
};

window.onload = function () {
  const subtitle = document.getElementById("subtitle");

  if (productId) {
    subtitle.innerText = "— Edit product";
    uploadBtn.innerText = "Edit";
    uploadBtn.classList.remove("btn-success");
    uploadBtn.classList.add("btn-warning");

    fetch(URL, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0N2RkYzFjMjUwNDAwMTUxYWI2NWMiLCJpYXQiOjE3NDYxNzM0MDQsImV4cCI6MTc0NzM4MzAwNH0.9mfygF0buvg5FEjuqwCMCBJk6YoVYsY2hEEgnGBZGVM",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Fetch error");
        }

        return resp.json();
      })
      .then((product) => {
        document.getElementById("item-name").value = product.name;
        document.getElementById("item-description").value = product.description;
        document.getElementById("item-brand").value = product.brand;
        document.getElementById("item-image").value = product.imageUrl;
        document.getElementById("item-price").value = product.price;

        delBtn.classList.remove("d-none");
      })
      .catch((error) => console.log(error));
  } else {
    subtitle.innerText = "— Upload new product";
  }
};

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

  fetch(URL, {
    method: method,
    body: JSON.stringify(newItem),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0N2RkYzFjMjUwNDAwMTUxYWI2NWMiLCJpYXQiOjE3NDYxNzM0MDQsImV4cCI6MTc0NzM4MzAwNH0.9mfygF0buvg5FEjuqwCMCBJk6YoVYsY2hEEgnGBZGVM",
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Fetch Error");
      }

      return resp.json();
    })
    .then((createdProduct) => {
      if (productId) {
        alert("Product " + createdProduct.name + " successfully edited!");
      } else {
        alert("Product " + createdProduct.name + " successfully created");
        backOfficeForm.reset();
      }
    })
    .catch((error) => console.log(error));
};
