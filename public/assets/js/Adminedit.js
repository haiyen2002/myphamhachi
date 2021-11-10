async function ClikSend() {
  const form = document.querySelector("form");
  const formData = new FormData(form);

  const name = $("#fname").val();
  const codeprd = $("#codeproduct").val();
  const price = $("#price").val();
  const quantity = $("#quantity").val();
  const rate = $("#rate").val();
  const descriptionDetails = $("#descriptionDetails").val();
  const prd_key = $("#prd_key").val();
  const res = await $.ajax({
    url: "/check/update/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
  });
  if (res) {
    const result = await $.ajax({
      url: "/check/updatenew",
      type: "POST",
      data: {
        name: name,
        img: res.arr,
        codeProduct: codeprd,
        price: price,
        quantity: quantity,
        prd_key: prd_key,
        descriptionDetails: descriptionDetails,
        rate: rate,
      },
    });
    if (result) {
      setTimeout(() => {
        hidetb();
        window.location.reload();
      }, 1500);
      $(".mess_tb").append(`<div id="top-mess" class="top-message">
      <div class="top-message-content text-center">
          <span class="glyphicon glyphicon-bullhorn"></span> Add Success.
          <span onclick="hidetb()" id="top-mess-hide" class="top-message-icon glyphicon glyphicon-chevron-up hidden-xs"></span></div></div>`);
    }
  }
}
async function changePage(page) {
  const search =
    document.querySelector("#classify_prd")[
      document.querySelector("#classify_prd").selectedIndex
    ].text;
  const datas = await $.ajax({
    url: "/check/change/pagination?page=" + page,
    type: "GET",
  });
  if (datas) {
    $(".showPrds").html(datas);
  }
}
async function Update_Role(id) {
  const roleUpdate = await $("select[id='role'] option:selected").text();
  var role = "";
  if (roleUpdate.includes("user")) {
    role = "user";
  } else {
    role = "admin";
  }
  const result = await $.ajax({
    url: "/check/updateUser/" + id,
    type: "PUT",
    data: { role: role },
  });
  if (result.status == 200) {
    $(".modal__close")[0].click();
    setTimeout(() => {
      hidetb();
      window.location.reload();
    }, 1500);
    $(".mess_tb").append(`<div id="top-mess" class="top-message">
    <div class="top-message-content container text-center">
        <span class="glyphicon glyphicon-bullhorn"></span> Update Success.
        <span onclick="hidetb()" id="top-mess-hide" class="top-message-icon glyphicon glyphicon-chevron-up hidden-xs"></span></div></div>`);
  } else {
    alert(result.mess);
  }
}

function hidetb() {
  if ($("#top-mess").is(":visible")) {
    $("#top-mess").slideUp("fast");
  }
}

async function deleteUser(id) {
  const result = await $.ajax({
    url: "/check/" + id,
    type: "DELETE",
  });
  if (result.status == 200) {
    setTimeout(() => {
      hidetb();
      window.location.reload();
    }, 1500);
    $(".mess_tb").append(`<div id="top-mess" class="top-message">
    <div class="top-message-content container text-center">
        <span class="glyphicon glyphicon-bullhorn"></span> Delete User Success.
        <span onclick="hidetb()" id="top-mess-hide" class="top-message-icon glyphicon glyphicon-chevron-up hidden-xs"></span></div></div>`);
  } else {
    alert(result.mess);
  }
}

async function editproduct(id) {
  console.log("condition");
  const name = $("#fname_" + id).val();
  const codeproduct = $("#codeproduct_" + id).val();
  const price = $("#price_" + id).val();
  const quantity = $("#quantity_" + id).val();
  const descriptionDetails = $("#descriptionDetails_" + id).val();
  const rate = $("#rate_" + id).val();
  const prd_key = $("#prd_key_" + id).val();

  const form = document.querySelector("#form_" + id);
  const formData = new FormData(form);
  if ($(".imgfocus").length != 0) {
    const updateimage = await $.ajax({
      type: "POST",
      url: "/check/updateimageprd",
      data: formData,
      processData: false,
      contentType: false,
    });
    if (updateimage) {
      try {
        const updatePrd = await $.ajax({
          type: "put",
          url: "/check/updateProduct/" + id,
          data: {
            name: name,
            img: updateimage.arr,
            codeProduct: codeproduct,
            price: price,
            quantity: quantity,
            prd_key: prd_key,
            descriptionDetails: descriptionDetails,
            rate: rate,
          },
        });
        if (updatePrd.mess == "finish") {
          $(".modal__close")[0].click();
          setTimeout(() => {
            hidetb();
            window.location.reload();
          }, 1500);
          $(".mess_tb").append(`<div id="top-mess" class="top-message">
          <div class="top-message-content container text-center">
              <span class="glyphicon glyphicon-bullhorn"></span> Edit Product Success.
              <span onclick="hidetb()" id="top-mess-hide" class="top-message-icon glyphicon glyphicon-chevron-up hidden-xs"></span></div></div>`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    try {
      const updatePrd = await $.ajax({
        type: "put",
        url: "/check/updateProduct/" + id,
        data: {
          name: name,
          codeProduct: codeproduct,
          price: price,
          quantity: quantity,
          prd_key: prd_key,
          descriptionDetails: descriptionDetails,
          rate: rate,
        },
      });
      if (updatePrd.mess == "finish") {
        $(".modal__close")[0].click();
        setTimeout(() => {
          hidetb();
          window.location.reload();
        }, 1500);
        $(".mess_tb").append(`<div id="top-mess" class="top-message">
        <div class="top-message-content container text-center">
            <span class="glyphicon glyphicon-bullhorn"></span> Edit Product Success.
            <span onclick="hidetb()" id="top-mess-hide" class="top-message-icon glyphicon glyphicon-chevron-up hidden-xs"></span></div></div>`);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

async function deleteProduct(id) {
  const result = await $.ajax({
    url: "/check/deletePrd/" + id,
    type: "DELETE",
  });
  console.log(result);
  if (result.status == 200) {
    setTimeout(() => {
      hidetb();
      window.location.reload();
    }, 1500);
    $(".mess_tb").append(`<div id="top-mess" class="top-message">
    <div class="top-message-content container text-center">
        <span class="glyphicon glyphicon-bullhorn"></span>Delete Product Success.
        <span onclick="hidetb()" id="top-mess-hide" class="top-message-icon glyphicon glyphicon-chevron-up hidden-xs"></span></div></div>`);
  } else {
    setTimeout(() => {
      hidetb();
      window.location.reload();
    }, 1500);
    $(".mess_tb").append(`<div id="top-mess" class="top-message">
    <div class="top-message-content container text-center">
        <span class="glyphicon glyphicon-bullhorn"></span>${result.mess}
        <span onclick="hidetb()" id="top-mess-hide" class="top-message-icon glyphicon glyphicon-chevron-up hidden-xs"></span></div></div>`);
  }
}
async function changevalue() {
  const datavalueselect =
    document.querySelector("#classify_prd")[
      document.querySelector("#classify_prd").selectedIndex
    ].text;
  if (datavalueselect == "Chăm sóc da") {
    $(".pageList").html("");
    const getresult = await $.ajax({
      type: "GET",
      url: "/check/listProducts/" + datavalueselect,
    });
    $(".showPrds").html(getresult);
  } else if (datavalueselect == "Chăm sóc tóc") {
    $(".pageList").html("");
    const getresult = await $.ajax({
      type: "GET",
      url: "/check/listProducts/" + datavalueselect,
    });
    $(".showPrds").html(getresult);
  } else if (datavalueselect == "Tất cả") {
    render();
    changePage(1);
  }
}

async function searchPrd() {
  if ($("input").val() != "") {
    $(".pageList").html("");
    const result = await $.ajax({
      type: "GET",
      url: "/check/searchprd/" + $("input").val().toUpperCase(),
    });
    console.log(result);
    $(".showPrds").html(result);
    if ($("tr").length <= 1) {
      $(".show_prds").append(
        `<span style ="display: block;padding: 70px 0;text-align: center; font-size: xx-large;margin: auto;" class="ouput_search"> No valid data found  </span>`
      );
    }
  }
  if ($("input").val() == "") {
    render();
    changePage(1);
  }
}

async function render() {
  const renderdata = await $.ajax({
    type: "GET",
    url: "/check/getPrd",
  });
  if (renderdata) {
    const totalPage = Math.ceil(renderdata / 9);
    $(".pageList").html("");
    for (let i = 1; i <= totalPage; i++) {
      const pageButton = `
        <button onclick='changePage(${i})'>${i}</button>
        `;
      $(".pageList").append(pageButton);
    }
  }
}

if (window.location.href.includes("listProducts")) {
  render();

  changePage(1);
}

async function ShowOrdersUser(id) {
  window.open(
    window.location.origin + `/check/views/oduser/?id=${id}`,
    "_blank"
  );
}

if (window.location.href.includes("listOrders")) {
  $.ajax({
    type: "GET",
    url: "/check/getOrders",
  }).then((data) => {
    const totalPage = Math.ceil(data / 9);
    $(".listpage").html("");
    for (let i = 1; i <= totalPage; i++) {
      const pageButton = `
        <button onclick='changePageorders(${i})'>${i}</button>
        `;
      $(".listpage").append(pageButton);
    }
  });
  changePageorders(1);
}
async function changePageorders(page) {
  const result = await $.ajax({
    type: "GET",
    url: "/check/pageNext?page=" + page,
  });
  if (result) {
    $(".border-table").html(result);
  }
}

async function Editorders(id) {
  console.log(id);
  $(".btn_edit--order_" + id).attr("style", "display: none");
  $(".changeEdit_" + id).append(`<div class="showedit">
  <a onclick="changeOrder('${id}' ,'Pending' )" style= "background-color : white !important">Pending</a>
  <a onclick="changeOrder('${id}' ,'Shipping' )" style= "background-color : white !important">shipping</a>
  <a onclick="changeOrder('${id}' ,'Delivered' )" style= "background-color : white !important">delivered</a>
</div>`);
}

async function changeOrder(id, status) {
  console.log(id);
  console.log(status);

  try {
    const result = await $.ajax({
      url: "/check/update_status_order",
      type: "POST",
      data: { id, status },
    });
    if (result.status == 200) {
      setTimeout(() => {
        hidetb();
        window.location.reload();
      }, 1500);
      $(".mess_tb").append(`<div id="top-mess" class="top-message">
      <div class="top-message-content container text-center">
          <span class="glyphicon glyphicon-bullhorn"></span>${result.mess}
          <span onclick="hidetb()" id="top-mess-hide" class="top-message-icon glyphicon glyphicon-chevron-up hidden-xs"></span></div></div>`);
    }
  } catch (error) {}
}
