// button go to top:
var buttonGoTop = $(".go-top");

window.addEventListener("scroll", () => {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    buttonGoTop.addClass("show");
  } else {
    buttonGoTop.removeClass("show");
  }
});

window.addEventListener("scroll", () => {
  $(".header-bottom").toggleClass("sticky", window.scrollY > 100);
});

// headerUp:
$(window).scroll(function () {
  var top = $(this).scrollTop();

  if (top >= 150) {
    $("#header").addClass("headerUp");
  } else {
    $("#header").remove("headerUp");
  }
});
//header-btn-search
$("#header-btn-search").on("click", () => {
  $(".search-overlay").addClass("active");
  $("body").css("overflow-y", "hidden");
});

//btn close
$(".search-overlay-close").on("click", () => {
  $(".search-overlay").removeClass("active");
  $("body").css("overflow-y", "");
});

$(".search-overlay").on("click", () => {
  $(".search-overlay").removeClass("active");
  $("body").css("overflow-y", "");
});

$(".select-overlay-top").on("click", (event) => {
  event.stopPropagation();
});

//slider
$("#slider-top .owl-carousel").owlCarousel({
  loop: true,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  nav: true,
  items: 1,
  navText: [
    '<span><i class="fas fa-angle-left"></i></span>',
    '<span><i class="fas fa-angle-right"></i></span>',
  ],
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});

//main
const typeBtns = document.querySelectorAll(".nav-product-popular__item");
const listSection = document.querySelectorAll(".section-list-product");

typeBtns[0].classList.add("active");
listSection[0].classList.add("active");

for (let i = 0; i < typeBtns.length; i++) {
  typeBtns[i].addEventListener("click", () => {
    removeClass();
    typeBtns[i].classList.add("active");
    listSection[i].classList.add("active");
  });
}

function removeClass() {
  for (let i = 0; i < typeBtns.length; i++) {
    typeBtns[i].classList.remove("active");
    listSection[i].classList.remove("active");
  }
}

//carousel:
$("#owl-0").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  navText: [
    '<span><i class="fas fa-angle-left"></i></span>',
    '<span><i class="fas fa-angle-right"></i></span>',
  ],
  slideBy: 3,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      nav: true,
      items: 5,
    },
  },
});

$("#owl-1").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  navText: [
    '<span><i class="fas fa-angle-left"></i></span>',
    '<span><i class="fas fa-angle-right"></i></span>',
  ],
  slideBy: 3,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      nav: true,
      items: 5,
    },
  },
});

// $('.owl-nav').removeClass('disabled')
//news carousel
$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  slideBy: 3,
  nav: true,
  navText: [
    '<span><i class="fas fa-angle-left"></i></span>',
    '<span><i class="fas fa-angle-right"></i></span>',
  ],
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      nav: true,
      items: 3,
    },
  },
});

//search
const inputdata = document.getElementById("input_search");
var selected = $(".select-box").val();

$(".select-box").on("change", () => {
  selected = $(".select-box").val();
});
inputdata.addEventListener("keyup", (e) => {
  $(".select-overlay-bottom").html("");
  showResult(e.target.value);
});

//resize with select type
// $("#width_tmp_option").html($('.select-box').find(':selected').text());
// $('.select-box').width(60);

// MODAL-MOBILE**********

$(".main-mobile-item").on("click", () => {
  $(".modal-nav-mobile").css("display", "flex");
  $(".main-mobile-item").css("display", "none");
});
function offModalMobile() {
  $(".modal-nav-mobile").css("display", "none");
  $(".main-mobile-item").css("display", "block");
}
$(".modal-nav-mobile").on("click", offModalMobile);
$(".modal-mobile").on("click", (event) => {
  event.stopPropagation();
});



