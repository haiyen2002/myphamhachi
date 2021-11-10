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
$(window).scroll(function() {
    var top = $(this).scrollTop()
  
     if(top >= 150){
        $('#header').addClass("headerUp")
     }else {
        $('#header').remove("headerUp")
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