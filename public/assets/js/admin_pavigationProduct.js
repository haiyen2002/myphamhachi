//phân trang
async function render() {
  try {
    let name = $("#search").val();
    const res = await $.ajax({
      url: "/admin/getPrd",
      type: "POST",
      data: {
        name: name,
      },
    });
    if (res.status == 200) {
      $(".listBtn").html("");
      const totalPage = Math.ceil(res.data.length / 6);
      for (let i = 1; i <= totalPage; i++) {
        const btnPage = `
                <button onclick="changePage(${i})">${i}</button>
                `;
        $(".listBtn").append(btnPage);
      }
      const newdata = res.data.slice(0, 6);
      $("tbody").html("");
      newdata.map((ele, index) => {
        let itemStart = `
                <tr>
                <td>${index + 1}</td>
                <td>${ele._id}</td>
                <td>
                  <div class="img_Product">               
                `;
        let itemEnd = `
                </div>
                </td>
                <td>${ele.name}</td>
                <td>${ele.prd_key}</td>
                <td>${parseInt(ele.price).toLocaleString() + "đ"}</td>
                <td>${ele.quantity}</td>
                <td><a href="#${
                  ele._id
                }" class="btn_fix"  onclick="fixProduct('${
          ele._id
        }')">Fix</a></td>
                <td><a href="#${
                  ele._id
                }"  class="btn_delete"  onclick="deleteProduct('${
          ele._id
        }')">Delete</a></td>
              </tr>`;
        let data = ele.img.map((image) => {
          return `
                    <img
                    class="img_prd"
                    src="${image}"
                    alt="chua co anh"
                  />
                    `;
        });
        let itemCenter = data.join("");

        let ok = itemStart + itemCenter + itemEnd;
        $("tbody").append(ok);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function changePage(page) {
  try {
    let name = $("#search").val();
    const res = await $.ajax({
      url: `/admin/pavigationProduct?page=${page}`,
      type: "POST",
      data: {
        name: name,
      },
    });
    if (res.status == 200) {
      $("tbody").html("");
      let newdata = res.data;
      newdata.map((ele, index) => {
        let itemStart = `
                <tr>
                <td>${index + 1 + (page - 1)*6}</td>
                <td>${ele._id}</td>
                <td>
                  <div class="img_Product">               
                `;
        let itemEnd = `
                </div>
                </td>
                <td>${ele.name}</td>
                <td>${ele.prd_key}</td>
                <td>${parseInt(ele.price).toLocaleString() + "đ"}</td>
                <td>${ele.quantity}</td>
                <td><a href="#${
                  ele._id
                }" class="btn_fix"  onclick="fixProduct('${
          ele._id
        }')">Fix</a></td>
                <td><a href="#${
                  ele._id
                }"  class="btn_delete"  onclick="deleteProduct('${
          ele._id
        }')">Delete</a></td>
              </tr>`;
        let data = ele.img.map((image) => {
          return `
                    <img
                    class="img_prd"
                    src="${image}"
                    alt="chua co anh"
                  />
                    `;
        });
        let itemCenter = data.join("");

        let ok = itemStart + itemCenter + itemEnd;
        $("tbody").append(ok);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

render();
