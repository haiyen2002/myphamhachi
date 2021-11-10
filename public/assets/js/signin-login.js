async function sigup() {
  try {
    const firtname = $("#lastname").val();
    const lastname = $("#Firtname").val();
    const Username = $("#inputEmail").val();

    const pass_sign = $("#inputPws").val();
    const passconfimsign = $("#inputConfirmPws").val();
    const gender = $('input[name="sex').val();
    var date = new Date($("#birthday").val());
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    const birthday = day + "/" + month + "/" + year;
    $(
      "#lastname,#Firtname,#inputEmail,#inputPws,#inputConfirmPws,input[name='sex'],#birthday"
    ).focus(function () {
      $(".err").remove();
      $(".error_pass").remove();
      if ($("#inputPws").attr("style")) {
        $("#inputPws").removeAttr("style");
        $("#inputConfirmPws").removeAttr("style");
        $("#inputPws").val("");
        $("#inputConfirmPws").val("");
      }
    });
    if (
      firtname == "" ||
      lastname == "" ||
      Username == "" ||
      pass_sign == "" ||
      passconfimsign == "" ||
      gender == ""
    ) {
      await setTimeout(() => {
        $(".err").remove();
      }, 2000);
      $(".modal-body").append(
        "<div style='color:red ; text-align:center;' class='err'>error form</div>"
      );
    } else if (pass_sign != passconfimsign) {
      await setTimeout(() => {
        $(".error_pass").remove();
      }, 2000);
      $("#inputPws").attr("style", "border : 1px solid red");
      $("#inputConfirmPws").attr("style", "border : 1px solid red");
      $(".modal-body").append(
        "<div style ='color:red ; text-align:center;' class='error_pass'>mật khẩu bạn nhập khác nhau </div>"
      );
    } else if (pass_sign != "" && validate(pass_sign) == false) {
      $(".modal-body").append(
        "<div style ='color:red ;' class='error_pass'>Mật khẩu phải dài ít nhất 8 kí tự trong đó có ít nhất 1 chữ hoa và 1 số</div>"
      );
    } else {
      const result = await $.ajax({
        url: "/user/signup",
        type: "POST",
        data: {
          firstname: firtname,
          lastname: lastname,
          username: Username,
          password: pass_sign,
          birthday: birthday,
          gender: gender,
        },
      });
      console.log(result);
      if (result.status == 200) {
        window.location.href = "/login";
      }
      if (result.status == 400) {
        alert("error");
        return;
      }
    }
  } catch (error) {
    console.log(error);
    window.location.href = "/500";
  }
}
function validate(password) {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[A-Za-z0-9]{6,}$/.test(password);
}
function onChange() {
  const password = document.querySelector("#inputPws");
  const confirm = document.querySelector("input[name=confirm]");
  if (confirm.value.length > 8) {
    confirm.setCustomValidity("");
  } else {
    confirm.setCustomValidity("Passwords do not match");
  }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

async function login() {
  try {
    const username = $("#email").val();
    const password = $("#pws").val();
    $("#email").focus(function () {
      $(".err").remove();
    });
    $("#pws").focus(function () {
      $(".err").remove();
    });
    const res = await $.ajax({
      url: "/user/login",
      type: "POST",
      data: { username, password },
    });
    if (res.status == 200) {
      setCookie("user", res.id, 30);
      $(".close").click();
      upCart();
      window.location.href = "/";
    } else if (res.status == 400) {
      alert(res.mess);
      // window.location.href = ""
      $(".modal-body").append(
        `<div class="err" style="color:red"> sai tài khoản hoặc mật khẩu </div>`
      );
    }
  } catch (error) {
    // window.location.href = "/500";
    console.log(error);
  }
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function checklogin() {
  $.ajax({
    url: "/user/checkLogin",
    type: "POST",
    headers: {},
  })
    .then((data) => {
      if (data.status == 200) {
        $(".add-to-cart").css("display", "block");
        $(".to-add").css("display", "block");
        // $(".header-top_account").html("");
        // const IdAccount = data.id;
        // $.ajax({
        //   url: "/user/" + IdAccount,
        //   type: "GET",
        // }).then((resultdata) => {
        $(".header-top_account").html("");
        let user = ` 
        <button style = "display: flex;
        width: auto;  z-index: 99;
        padding-left: 10px;
        padding-right: 10px;
        color: black;
        border: none;
        background-color: white;">
        <a class="dropdown-toggle d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuLink" role="button"
        data-mdb-toggle="dropdown" aria-expanded="false">
        <img src="${data.checkUser.avatar}" style="margin-right: 10px;
        height: 30px; width: 30px; object-fit: cover;" class="rounded-circle" height="25" alt=""
            loading="lazy"/>
        </a>
        <span data-mdb-toggle="dropdown" style="line-height: 30px; color: #777"> ${
          data.checkUser.firstname
        } ${` `}${data.checkUser.lastname}</span>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
        <li>
        <i class="fas fa-users"></i>
            <a class="dropdown-item" href="/profile" >Tài khoản của tôi</a>
        </li>
        <li>
        <li>
        <i class="fas fa-sign-out-alt"></i>
            <a class="dropdown-item" href="#" onclick="logout()">Logout</a>
        </li>
        </ul> </button>`;
        $(".header-top_account").append(user);
        //     });
        //   } else {
        //     // $(".pb-modalreglog-submit")[0].click();
        //     console.log(100);
      }
    })
    .catch((err) => {
      window.location.href = "/500";
      console.log(err);
    });
}

function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
async function logout() {
  try {
    const res = await $.ajax({
      url: "/user/logout",
      type: "POST",
    });
    if (res.status === 200) {
      delete_cookie("user");
      localStorage.removeItem("shoppingCart");
      window.location.href = "/";
    }
  } catch (error) {
    window.location.href = "/500";
  }
}

async function checkuser() {
  const input = $("#inputEmail").val();
  const result = await $.ajax({
    url: "/user/available",
    type: "POST",
    data: { username: input },
  });
  if (result.status === 200) {
    $(".ipn_email").append(`<div class="err-email" style = "right: 20px;
    position: absolute; color : red ; margin-top : 5px"> Tài khoản đã tồn tại </div>`);
    $(".signupbtn").prop("disabled", true);
  } else {
    $(".err-email").remove();
    $(".signupbtn").removeAttr("disabled");
  }
}

checklogin();

(() => {
  $(".close").click(() => {
    window.location.href = "/";
  });
})();

async function upCart() {
  try {
    const res = await $.ajax({
      url: "/cart/check",
      type: "GET",
    });
    if (res.status == 200) {
      const cart = res.data.Cart;
      let productInCart = [];
      for (let i = 0; i < cart.length; i++) {
        let obj = {
          basePrice: cart[i].productId.price,
          count: cart[i].quantity,
          id: cart[i].productId._id,
          name: cart[i].productId.name,
          price: cart[i].productId.price,
          image: cart[i].productId.img[0],
        };
        productInCart.push(obj);
      }
      localStorage.setItem("shoppingCart", JSON.stringify(productInCart));
    } else {
      console.log(res.mess);
    }
  } catch (error) {
    console.log(error);
  }
}
