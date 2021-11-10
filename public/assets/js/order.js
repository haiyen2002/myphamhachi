async function listorder() {
  var product = JSON.parse(localStorage.getItem("shoppingCart"));
  var total = 0;
  for (let i = 0; i < product.length; i++) {
    total += product[i].price;
  }
  //   console.log(total);
  var address = $("#address").val();
  $(".form-message").html("");
  try {
    $("#address").on("keyup", () => {
      $(".form-message").html("");
    });
    if (address.trim()) {
      const data = await $.ajax({
        url: "/cart/order",
        type: "post",
        data: {
          totalPrice: total,
          address: address,
        },
      });
      if (data.status == 200) {
        alert(data.mess);
        localStorage.removeItem("shoppingCart");
        window.location.href = "/";
      } else if (data.status == 400) {
        alert(data.mess);
        window.location.href = "/";
      }
    } else {
      $(".form-message").append("Vui lòng nhập");
    }
  } catch (error) {
    console.log(error);
  }
}





  
