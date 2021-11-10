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

// MODAL-MOBILE**********
//hien filter
$(".modal-mobile-filter").on("click", function () {
  $('.modal-nav-mobile-filter').css("display", "none");
  $(".fa-filter").css("display", "block");
});

// console.log($('.modal-nav-mobile-filter'))
//an filter
$(".fa-filter").on("click", () => {
  $(".modal-nav-mobile-filter").css("display", "block");
  $(".fa-filter").css("display", "none");
});
// function offModalMobile() {
//   $(".modal-nav-mobile-filter").css("display", "none");
//   $(".fa-filter").css("display", "block");
// }
// $(".modal-nav-mobile-filter").on("click", offModalMobile);
// $(".modal-mobile-filter").on("click", (event) => {
//   event.stopPropagation();
// });
$('.container-mobile-filter').on('click',(e) => {
  e.stopPropagation();
})