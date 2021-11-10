async function loginAdmin(){
    try {
        const user = document.querySelector("#username")
        const pass =   document.querySelector("#password")
        checkblur(user)
        checkblur(pass)
        checkValue(user)
        checkValue(pass)

        if( checkValue(user) == 100 && checkValue(pass) == 100){
            const data = await $.ajax({
                url: "/admin/dangnhap",
                type: "POST",
                data: {
                    username:user.value,
                    password: pass.value
                }
            })
            if(data.status == 200){
                setCookie("user", data.id, 30);
                alert(data.mess)
                window.location.href = "/admin/home"
            }else if(data.status == 400){
                $(".form-message-error").html("")
                $(".form-message-error").append(`${data.mess}`)
            }
        }
        
    } catch (error) {
        console.log(error);
    }
}



function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function checkValue(item){
        let itemValue = item.value
      if(itemValue.trim() == ""){
        item.parentElement.querySelector(".form-message").innerHTML = ""
        item.parentElement.querySelector(".form-message").innerHTML = "Vui lòng nhập trường này"

      }else{
          return 100
      }
  }
  function checkblur(item){
    item.addEventListener("keyup", ()=>{
        item.parentElement.querySelector(".form-message").innerHTML = ""
    })
  }

 

  function delete_cookie(name) {
    document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
  async function logoutAdmin() {
    try {
      const res = await $.ajax({
        url: "/admin/logoutAdmin",
        type: "POST",
      });
      if (res.status == 200) {
        delete_cookie("user");
        localStorage.removeItem("shoppingCart");
        window.location.href = "/admin/dangnhap";
      }
    } catch (error) {
      console.log(error);
    }
  }


    $.ajax({
        url: "/user/checkLogin",
        type: "POST",
        headers: {},
      })
        .then((data) => {
          if (data.status !== 200) {
            window.location.href = "/admin/dangnhap";
            // alert(data.mess);
          }
        })
        .catch((err) => {
          console.log(err);
        });


  