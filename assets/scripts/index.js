const allProducts = document.getElementById("products-row");

const getAllProducts = () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0N2RkYzFjMjUwNDAwMTUxYWI2NWMiLCJpYXQiOjE3NDYxNzM0MDQsImV4cCI6MTc0NzM4MzAwNH0.9mfygF0buvg5FEjuqwCMCBJk6YoVYsY2hEEgnGBZGVM",
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        if (resp.status === 404) {
          throw new Error("Products not found");
        } else if (resp.status >= 500) {
          throw new Error("Server error");
        }

        throw new Error("Fetch error");
      }
      return resp.json();
    })
    .then((items) => {
      items.forEach((item) => {
        const colArea = document.createElement("div");
        colArea.className = "col-md-4";

        const itemCard = document.createElement("div");
        itemCard.className = "card";

        const itemImage = document.createElement("img");
        itemImage.className = "card-img-top object-fit-cover";
        itemImage.src = item.imageUrl;
        itemImage.alt = item.description;

        const itemCardBody = document.createElement("div");
        itemCardBody.className = "card-body card-min-height d-flex flex-column";

        const itemTitle = document.createElement("h5");
        itemTitle.className = "card-title";
        itemTitle.innerText = item.name;

        const itemPrice = document.createElement("p");
        itemPrice.className = "card-text";
        itemPrice.innerText = item.price + "€";

        const itemBrand = document.createElement("p");
        itemBrand.className = "card-text";
        itemBrand.innerText = "Brand: " + item.brand;

        const itemDesc = document.createElement("p");
        itemDesc.className = "card-text flex-grow-1";
        itemDesc.innerText = item.description;

        const cardBtnArea = document.createElement("div");
        cardBtnArea.className = "d-flex justify-content-between";

        const exploreBtn = document.createElement("a");
        exploreBtn.className = "btn btn-primary flo-primary-bg-color";
        exploreBtn.innerText = "Explore";
        exploreBtn.href = "./product-details.html?productId=" + item._id;

        const editBtn = document.createElement("a");
        editBtn.className = "btn btn-warning";
        editBtn.innerHTML = `<i class="bi bi-pencil-square"></i>`;
        editBtn.href = "#";

        allProducts.appendChild(colArea);
        colArea.appendChild(itemCard);
        itemCard.appendChild(itemImage);
        itemCard.appendChild(itemCardBody);
        itemCardBody.appendChild(itemTitle);
        itemCardBody.appendChild(itemPrice);
        itemCardBody.appendChild(itemBrand);
        itemCardBody.appendChild(itemDesc);
        itemCardBody.appendChild(cardBtnArea);
        cardBtnArea.appendChild(exploreBtn);
        cardBtnArea.appendChild(editBtn);

        editBtn.onclick = function () {
          window.location.assign("./backoffice.html?productId=" + item._id);
        };
      });
    });
};

window.onload = function () {
  getAllProducts();
};
