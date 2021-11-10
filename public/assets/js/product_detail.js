var quantity = parseInt($("#solg").val());
$("#solg").val(quantity);
function plus() {
  quantity += 1;
  if (quantity > $("#solg").attr("max")) {
    quantity = $("#solg").attr("max");
  }
  $("#solg").val(quantity);

}

function minus() {
  quantity -= 1;
  if (quantity < parseInt($("#solg").attr("min"))) {
    quantity = parseInt($("#solg").attr("min"));
  }
  $("#solg").val(quantity);
}

//change image


function changeImage(){
  $($(".container-product-left-img__img")[0]).addClass('border-active');
  $(".container-product-left-img__img").click(function () {
   
    $(".container-product-left-img__img").each(function(){
      $(this).removeClass('border-active')
    })
    $(this).addClass('border-active');
    $('.main-image img').attr('src', $(this).attr('src'))
    $('.main-image img').attr('data-zoom', $(this).attr('src'))
  })
}
changeImage()

//end change image

const prd_detail =document.querySelector('.product-main')

// lấy thông tin tên, số lượng, giá tiền, tổng sản phẩm có trong kho của sản phẩm muốn mua
if(prd_detail != null){
    prd_detail.addEventListener("click", (event) => {
        if (event.target.classList.contains("prd-detail-add-gotoPay")) {
          const productID = event.target.dataset.productId;
          const count = prd_detail.querySelector("#solg").value;
          const productName = prd_detail.querySelector(".prd-detail-name p").innerHTML;
          const productPriceS = prd_detail.querySelector(".product-card_price span").innerHTML;
          const productImg = prd_detail.querySelector(".prd-detail-img").src;
          const productPrice = parseInt(productPriceS.replace(/,/g, ""));
          const maxCount = prd_detail.querySelector(".product-card_quantity span").innerHTML;
          const maxCountS = parseInt(maxCount)
          let product = {
            name: productName,
            image: productImg,
            id: productID,
            count: parseInt(count),
            price: productPrice,
            basePrice: productPrice,
            maxCount: maxCountS
          };
          //update lên localstorage
          updateProductsInCart(product);
          //update client hover cart
          updateShoppingCartHTML();
          //update data lên Cart
          updatedataCart();
          //update client cart
          if (prdCart != null) {
            updateCart();
          }
        }
      });
}

$(".owl-carousel").owlCarousel({
  loop: true,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  nav: true,
  items: 1,
  // navText: [
  //   '<span><i class="fas fa-angle-left"></i></span>',
  //   '<span><i class="fas fa-angle-right"></i></span>',
  // ],
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
});