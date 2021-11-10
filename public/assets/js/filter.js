var type = "";
var min = 0;
var max = 100000000;
var page = 1;
var textF = "";

$(".filter-checkbox").each(function () {
  document.getElementById("all").click();
  $(this).on("click", () => {
    type = $(this).val();
    render(page);
  });
});

$(".price-checkbox").each(function () {
  $(this).on("click", () => {
    min = $(this).attr("min");
    max = $(this).attr("max");
    render(page);
  });
});

$(".search-icon-filter").on('click',()=>{
  textF = $("input#search-input-filter").val()
  render(page);
})


async function render(page) {
  // $(this).css("background-color","#006885 !important");
  // console.log(this);
  const res = await $.ajax({
    url: `filter/${page}`,
    type: "POST",
    data: {
      type,
      min,
      max,
      textF
    },
  });
  //lấy sản phẩm trả về tương ứng với page, type, min , max
  const products = res.products;
  //làm trống phần sản phẩm
  $(".filter-product-results").html("");//làm trống danh sách sản phẩm
  products.forEach((product) => {//render các sản phẩm trả về
    var pPrice = product.price
    pPrice = pPrice.toLocaleString()
    $(".filter-product-results").append(`
    <div class="filter-col filter-col-4 currProduct product-card_item">
    <a class="product-filter__card" href="/product/detail/${product._id}">
      <div class="product-filter-card__top">
        <img class="img-prd" src="${product.img[0]}" alt="" />
      </div>
      <div class="product-filter-card__bottom">
        <div class="product-filter-card__name product-card_title">
          ${product.name}
        </div>
        <div class="product-filter-card__price product-card_price">
          ${pPrice}đ
        </div>
      </div>
    </a>
    <a class="add-to-cart" href="/product/detail/${product._id}" data-product-id="${product._id}">
      <i class="fas fa-cart-plus"></i> Mua hàng
    </a>
  </div>
    `);
  });

  const pages = res.pages;
  const current = res.current;
  $('.row').html('')
  if(pages > 0){
    $('.row').append(`
      <nav class="mx-auto">
      <ul class="pagination-filter" style="margin-top: 2rem">
      </ul>
      </nav>
    `);
    checklogin()
    //first item thêm cái nút đầu tiên
    if(current == 1){
      $('.pagination-filter').append(`
      <li class="page-item disabled">
        <a class="page-link"><i class="fas fa-fast-backward"></i></a>
      </li>
      `)
    }else{
      $('.pagination-filter').append(`
      <li class="page-item">
        <a class="page-link" onclick="render(1)"><i class="fas fa-fast-backward"></i></a>
      </li>
      `)
    }
    //item
    // var i = (Number(current) > 2 ? Number(current) - 1 : 1);// kiểm tra coi có cần thêm cái nut
    var i;
    if( Number(current) > 2 ){
      i = Number(current) - 1
    } else {
      i = 1
    }
    if(i !== 1) {
      $('.pagination-filter').append(`
      <li class="page-item disabled">
        <a class="page-link">...</a>
      </li>
      `)
    }
    for(; i <= (Number(current) + 1) && i <= pages; i++) {
      if(i == current) {
        $('.pagination-filter').append(`
        <li class="page-item active">
          <a class="page-link" onclick="render(${i})"> ${i} </a>
        </li>
        `)
      }else {
        $('.pagination-filter').append(`
        <li class="page-item">
          <a class="page-link" onclick="render(${i})"> ${i} </a>
        </li>
        `)
      }
      if (i == Number(current) + 2 && i < pages) {
        $('.pagination').append(`
        <li class="page-item disabled">
          <a class="page-link">...</a>
        </li>
        `)
      }
      
    }
    //last item
    if(current == pages) {
      $('.pagination-filter').append(`
      <li class="page-item disabled">
        <a class="page-link"> <i class="fas fa-fast-forward"></i> </a>
      </li>
      `)
    }else{
      $('.pagination-filter').append(`
      <li class="page-item">
        <a class="page-link" onclick="render(${pages})"> <i class="fas fa-fast-forward"></i> </a>
      </li>
      `)
    }
  }
}
