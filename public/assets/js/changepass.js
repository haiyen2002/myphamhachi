function checklogin() {
  $.ajax({
    url: "/user/checkLogin",
    type: "POST",
    headers: {},
  })
    .then((data) => {
      if (data.status === 200) {
        const IdAccount = data.id;
        $.ajax({
          url: "user/" + IdAccount,
          type: "GET",
        }).then((resultdata) => {
          $(".btn_save").attr("onclick", `update()`);
        });
      }
    })
    .catch((err) => {
      window.location.href = "/500";
    });
}

checklogin();

async function getusername() {
  try {
    const data = await $.ajax({
      url: "/user/checkLogin",
      type: "POST",
      headers: {},
    });
    if (data.status === 200) {
      const IdAccount = data.id;
      const username = await $.ajax({
        url: "user/" + IdAccount,
        type: "GET",
      });
      if (username) {
        return username.username;
      }
    }
  } catch (error) {
    window.location.href = "/500";
  }
}
async function logout() {
  try {
    const res = await $.ajax({
      url: "/user/logout",
      type: "POST",
    });
    if (res.status === 200) {
      delete_cookie("user");
      window.location.href = "/";
    }
  } catch (error) {
    window.location.href = "/500";
  }
}
function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
async function update() {
  const usernamefocus = await getusername().then((data) => {
    return data;
  });
  const passnew = $("#pwsnew").val();
  const comfirmpass = $("#pwsconfirm").val();
  if (passnew != comfirmpass) {
    await setTimeout(() => {
      $("#pwsnew").val("");
      $("#pwsconfirm").val("");
      $(".errorpass").remove();
    }, 2000);
    $(".py-2").append(
      ` <div class="errorpass" style="color: red; margin-top: 5px;"><span>mật khẩu bạn nhập không giống nhau</span></div>`
    );
  } else {
    const changepass = await $.ajax({
      url: "user/changepass",
      type: "POST",
      data: { username: usernamefocus, password: passnew },
    });
    if (changepass) {
      try {
        const res = await $.ajax({
          url: "/user/logout",
          type: "POST",
        });
        if (res.status == 200) {
          delete_cookie("user");
          window.location.href = "/";
        }
      } catch (error) {}
    }
  }
}
