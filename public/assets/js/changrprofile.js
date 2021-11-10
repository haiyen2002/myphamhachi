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
          $(".img").attr("src", resultdata.avatar);
          $("#firstname").val(resultdata.firstname);
          $("#lastname").val(resultdata.lastname);
          $("#email").val(resultdata.email);
          $("#phone").val(resultdata.phone);
          var dt = resultdata.birthday.split("/");
          if (dt[1].length == 1) {
            dt[1] = "0" + dt[1];
          }
          var date = dt[2] + "-" + dt[1] + "-" + dt[0];
          $("#birthday").val(date);
          $(".btn_save").attr("onclick", `update()`);
        });
      }
    })
    .catch((err) => {
      window.location.href = "/500";
    });
}

function previewFile() {
  var preview = document.querySelector(".img");
  var file = document.querySelector("input[type=file]").files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    if (!reader.result.includes("image")) {
      preview.alt = "data not photo";
    }
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

async function update() {
  var file = document.querySelector("input[type=file]").files[0];

  if (file != undefined) {
    unlinks();
    const form = document.querySelector("form");
    const formData = new FormData(form);
    const firstname = $("#firstname").val();
    const lastname = $("#lastname").val();
    const email = $("#email").val();
    const phone = $("#phone").val();
    var date = new Date($("#birthday").val());
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    const birthday = day + "/" + month + "/" + year;
    const res = await $.ajax({
      url: "/user/update/",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
    });
    if (res) {
      const usernamefocus = await getusername().then((data) => {
        return data;
      });
      const linkavt = ("/" + res.link).replace(`\\`, "/");
      console.log(linkavt);
      const dataresults = await $.ajax({
        url: "/user/updatenew",
        type: "POST",
        data: {
          username: usernamefocus,
          lastname: lastname,
          firstname: firstname,
          birthday: birthday,
          email: email,
          phone: phone,
          avatar: linkavt,
        },
      });
      if (dataresults) {
        window.location.href = "/changeprofile";
      }
    }
  } else {
    const firstname = $("#firstname").val();
    const lastname = $("#lastname").val();
    const email = $("#email").val();
    const phone = $("#phone").val();
    var date = new Date($("#birthday").val());
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    const birthday = day + "/" + month + "/" + year;
    const usernamefocus = await getusername().then((data) => {
      return data;
    });
    const dataresults = await $.ajax({
      url: "/user/updatenew",
      type: "POST",
      data: {
        username: usernamefocus,
        lastname: lastname,
        firstname: firstname,
        birthday: birthday,
        email: email,
        phone: phone,
      },
    });
    if (dataresults) {
      window.location.href = "/changeprofile";
    }
  }
}

async function unlinks() {
  const usernamefocus = await getusername().then((data) => {
    return data;
  });
  const dataresults = await $.ajax({
    url: "/user/unlink",
    type: "POST",
    data: {
      username: usernamefocus,
    },
  });
  console.log(dataresults);
}

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

function cancel() {
  window.location.href = "/";
}

checklogin();
