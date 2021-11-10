async function changePass() {
    try {
        const newpass = document.querySelector("#newpass")
        const comfirm =   document.querySelector("#comfirm")
        checkblur(newpass)
        checkblur(comfirm)
        checkValue(newpass)
        checkValue(comfirm)
        if( checkValue(newpass) == 100 && checkValue(comfirm) == 100){
            if (newpass.value == comfirm.value) {
                const data = await $.ajax({
                    url: "/admin/changePass",
                    type: "put",
                    data: {
                        newpass: newpass.value,
                        comfirm: comfirm.value,
                    },
                });
                if (data.status == 200) {
                    alert(data.mess);
                    window.location.href = ""
                }
              } else {
                    $(".message-error").html("")
                    $(".message-error").html("Mật khẩu xác nhận không đúng")
              }
        }
       
    } catch (error) {
      console.log(error);
    }
  }

