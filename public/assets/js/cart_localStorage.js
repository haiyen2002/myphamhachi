let productsInCart = JSON.parse(localStorage.getItem("shoppingCart"));
if (!productsInCart) {
  productsInCart = [];
}

const products = document.querySelectorAll(".product-card_item");
// các mục cần hiển thị khi hover nút giỏ hàng
const parentElement = document.querySelector("#buyItems");
const countSumCart = document.querySelector(".countSumCart");
const priceSumCart1 = document.querySelector(".priceSumCart");
const tableTitle = document.querySelector(".tableTitle");

// các mục cần hiển thị trong trang giỏ hàng

const prdCart = document.querySelector(".buy-table");
const prdContent = document.querySelector(".content-table");
const prdTotal = document.querySelector(".right-cart");

// các mục cần hiển thị trong trang order

const order_content = document.querySelector(".content-items");
const order_buy = document.querySelector(".prd-buy-items");
const order_price = document.querySelector(".total-price");


// tính toán cập nhật số lượng và chỉnh tổng tiền từng sản phẩm rồi push vào localStorage
function updateProductsInCart(product) {
  for (let i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].id == product.id) {
        productsInCart[i].count += product.count;
            productsInCart[i].price =
            productsInCart[i].count * productsInCart[i].basePrice;
        return productsInCart[i];
    }
  }
  productsInCart.push(product);
}

// client khi hover giỏ hàng
const updateShoppingCartHTML = function () {
  localStorage.setItem("shoppingCart", JSON.stringify(productsInCart));

  if (productsInCart.length > 0) {
    let data = productsInCart.map((product) => {
      return `
            <div class="buyItem">
                <div class="img-prd-cart">
                    <img class="img-prd" src="${product.image}">
                </div>
                <div class="name-prd-cart">
                    <p>${product.name}</p>
                </div>
                <div class="price-prd-cart">
                    <p>${product.basePrice.toLocaleString() + "đ"}</p>
                </div>
                <div class="count-prd-cart">
                    <button class="button-minus" data-id="${
                    product.id
                    }">-</button>
                    <span class="countOfProduct">${product.count}</span>
                    <button class="button-plus" data-id="${product.id}">+</button>
                </div>
                <div class="total-price">
                    <p>${product.price.toLocaleString() + "đ"}</p>
                </div>
            </div>
           `;
    });
    parentElement.innerHTML = data.join("");
    tableTitle.innerHTML = `
        <div class="tableItem">
        <div class="img-prd-cart"></div>
        <div class="name-prd-cart">Sản phẩm</div>
        <div class="price-prd-cart">Giá</div>
        <div class="count-prd-cart">Số lượng</div>
        <div class="total-price">Tạm tính</div>
        </div>
    `;

    priceSumCart1.innerHTML = `
      <div class="totalItem">
      <div class= "total">Tổng :</div>
      <div class="buy-sumPrice">${countTheSumPrice() + "đ"}</div>
      </div>
    `;
    countSumCart.innerHTML = countTheSumPrd();
  } else {
    parentElement.innerHTML = `
    <div class="empty">
    <img class="img-empty"  src="https://i.pinimg.com/originals/85/2f/49/852f494d72637092dcef5e11afeabd58.gif">
    </div>`;
    countSumCart.innerHTML = "0";
    tableTitle.innerHTML = "";
    priceSumCart1.innerHTML = "";
  }
};

// client trong giỏ hàng
const updateCart = function () {
  localStorage.setItem("shoppingCart", JSON.stringify(productsInCart));
  if (productsInCart.length > 0) {
    let data = productsInCart.map((product) => {
      return `
        <div class="buy-table-item">
        <div class="item-td">
        <a class="item-prd-link" href="/products/detail/${product.id}">
        <img class="item-img" src="${product.image}" alt="" />        
        </a>
        </div>
        <div class="item-td">
        <a class="item-prd-link" href="/product/detail/${product.id}">${
            product.name
        }</a>
        </div>
        <div class="item-td price">${
            product.basePrice.toLocaleString() + "đ"
        }</div>
        <div class="item-td">
            <button class="button-minus" data-id="${product.id}">-</button>
            <span class="countOfProduct">${product.count}</span>
            <button class="button-plus" data-id="${product.id}">+</button>
        </div>
        <div class="item-td prices">${product.price.toLocaleString() + "đ"}</div>
        <div class="item-td"><button class="prd-cart_delete" data-id="${
            product.id
        }">X</button></div>
        </div>
        <hr />
      `;
    });
    prdCart.innerHTML = data.join("");
    prdContent.innerHTML = `
        <div class="content-table-items">
        <div class="item-td">Sản phẩm</div>
        <div class="item-td"></div>
        <div class="item-td">Đơn giá</div>
        <div class="item-td">Số lượng</div>
        <div class="item-td prices">Tạm tính</div>
        <div class="item-td">Xóa</div>
        </div>
    `;
    prdTotal.innerHTML = `
        <div class="right-content"><p>CỘNG GIỎ HÀNG</p></div>
        <div class="total">
            <div class="total-content">Tạm tính</div>
            <div class="total-price">${countTheSumPrice() + "đ"}</div>
        </div>
        <div class="total-end">
            <div class="total-end-content">Tổng</div>
            <div class="total-end-price">${countTheSumPrice() + "đ"}</div>
        </div>
        <a class="pay"  href="/order/">
            <div class="pay-item">Tiến hành thanh toán</div>
        </a>
    `;
    countSumCart.innerHTML = countTheSumPrd();
  } else {
    prdCart.innerHTML = `
        <div class="empty-left">
        <img class="img-empty"  src="https://i.pinimg.com/originals/85/2f/49/852f494d72637092dcef5e11afeabd58.gif">
        </div>
    `;
    prdContent.innerHTML = ``;
    prdTotal.innerHTML = `
        <div class="empty-right">
        <img class="img-empty-right" src="https://img.wattpad.com/5d1670762e41f209bd3face7be02590eb60dc718/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f76664d72595466696e674d6c72413d3d2d313132353638313436312e313661323233663937363235323733653431333736323034303432382e676966">
        </div>
    `;
    countSumCart.innerHTML = "0";
  }
};

// client trong trang order
const updateOder = function () {
  localStorage.setItem("shoppingCart", JSON.stringify(productsInCart));
  if (productsInCart.length > 0) {
    let data = productsInCart.map((product) => {
      return `
        <div class="prd-buy-item">
            <div class="buy-item-prd">${product.name}</div>
            <div class="buy-item-count">${product.count}</div>
            <div class="buy-item-price">${
                product.price.toLocaleString() + "đ"
            }</div>
        </div>
      
      `;
    });
    order_buy.innerHTML = data.join("");
    order_content.innerHTML = `
        <div class="content-prd">Sản phẩm</div>
        <div class="content-count">Số lượng</div>
        <div class="content-price">Tạm tính</div>
    `;
    order_price.innerHTML = `
        <div class="total-txt">Tổng</div>
        <div class="total-end">${countTheSumPrice() + "đ"}</div>
    `;
  } else {
    order_buy.innerHTML = ``;
    order_content.innerHTML = ``;
    order_price.innerHTML = ``;
  }
};

// đếm số lượng sản phẩm
const countTheSumPrd = function () {
  // let sum = 0;
  // productsInCart.forEach((item) => {
  //   sum += item.count;
  // });
 let sum = productsInCart.length;
  return sum;
};

// tính tổng tiền
const countTheSumPrice = function () {
  let sum1 = 0;
  productsInCart.forEach((item) => {
    sum1 += item.price;
  });
  return sum1.toLocaleString();
};

// tăng giảm số lượng trên client hover của giỏ hàng
parentElement.addEventListener("click", (event) => {
  const isPlusButton = event.target.classList.contains("button-plus");
  const isMinusButton = event.target.classList.contains("button-minus");

  if (isPlusButton || isMinusButton) {
    for (let i = 0; i < productsInCart.length; i++) {
        if (
            productsInCart[i].id == event.target.dataset.id &&
            productsInCart[i].count < productsInCart[i].maxCount
          ) {
            if (isPlusButton) {
              productsInCart[i].count  += 1;
            }
            productsInCart[i].price =
              productsInCart[i].basePrice * productsInCart[i].count;
          }
          if (
            productsInCart[i].id == event.target.dataset.id &&
            productsInCart[i].count <= productsInCart[i].maxCount
          ) {
            if (isMinusButton) {
              productsInCart[i].count  -= 1;
            }
            productsInCart[i].price =
              productsInCart[i].basePrice * productsInCart[i].count;
          }
          if (productsInCart[i].count <= 0) {
            productsInCart.splice(i, 1);
          }
      
    }
    updateShoppingCartHTML();
    if (prdCart != null) {
      updateCart();
    }
    updatedataCart();
  }
});

// tăng giảm số lượng trong giỏ hàng
if (prdCart != null) {
  prdCart.addEventListener("click", (event) => {
    const isPlusButton = event.target.classList.contains("button-plus");
    const isMinusButton = event.target.classList.contains("button-minus");
    if (isPlusButton || isMinusButton) {
      for (let i = 0; i < productsInCart.length; i++) {
        if (
            productsInCart[i].id == event.target.dataset.id &&
            productsInCart[i].count < productsInCart[i].maxCount
          ) {
            if (isPlusButton) {
              productsInCart[i].count  += 1;
            }
            productsInCart[i].price =
              productsInCart[i].basePrice * productsInCart[i].count;
          }
          if (
            productsInCart[i].id == event.target.dataset.id &&
            productsInCart[i].count <= productsInCart[i].maxCount
          ) {
            if (isMinusButton) {
              productsInCart[i].count  -= 1;
            }
            productsInCart[i].price =
              productsInCart[i].basePrice * productsInCart[i].count;
          }
          if (productsInCart[i].count <= 0) {
            productsInCart.splice(i, 1);
          }
      }
      updateShoppingCartHTML();
      updateCart();
      updatedataCart();
    }
  });
}

// button xóa sản phẩm khỏi giỏ hàng
if (prdCart != null) {
  prdCart.addEventListener("click", (event) => {
    const prd_delete = event.target.classList.contains("prd-cart_delete");
    if (prd_delete) {
      for (let i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].id == event.target.dataset.id) {
          productsInCart.splice(i, 1);
        }
      }
      updateShoppingCartHTML();
      updateCart();
      updatedataCart();
    }
  });
}

if (order_buy != null) {
  updateOder();
}

// console.log(prdCart);
if (prdCart != null) {
  updateCart();
}

updateShoppingCartHTML();