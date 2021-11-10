var delete_cookie = function (name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

async function logout() {
  delete_cookie();
  window.location.href = "/admin/login";
}
var working = false;

$("[type='text'],[type='password']").focus(function () {
  $(".err").remove();
});

async function login() {
  let username = $("[type='text']").val();
  let password = $("[type='password']").val();
  if (username == "admin" && password == "admin") {
    setCookie("user", "admin", 30);
    window.location.href = "/admin";
  } else {
    const loginadmin = await $.ajax({
      url: "/admin/login",
      type: "POST",
      data: { username: username, password: password },
    });
    if (loginadmin.status == 200) {
      setCookie("user", loginadmin.id, 30);
      window.location.href = "/check/listuser";
    }
    if (loginadmin.mess == "ban khong co quyen admin") {
      $(".login").append(
        `<div class="err" style="color :red">` + loginadmin.mess + `</div>`
      );
    }
    if (
      loginadmin.mess == "sai password" ||
      loginadmin.mess == "sai username"
    ) {
      $(".login").append(
        `<div class="err" style="color :red">` + loginadmin.mess + `</div>`
      );
    }
  }
}
function logout() {
  delete_cookie("user");
  window.location.href = "/admin/login";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
