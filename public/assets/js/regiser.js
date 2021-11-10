async function regiser(){
    try {
        const firstname = document.querySelector("#firstName")
        const lastname = document.querySelector("#lastName")
        const username = document.querySelector("#username")
        const comfirm = document.querySelector("#comfirm")
        const password = document.querySelector("#password")
        const email = document.querySelector("#email")
        const phone = document.querySelector("#phone")
        checkValue(firstname)
        checkValue(lastname)
        checkValue(username)
        checkValue(comfirm)
        checkValue(password)
        checkValue(email)
        checkValue(phone)
        
        

        checkblur(firstname)
        checkblur(lastname)
        checkblur(username)
        checkblur(comfirm)
        checkblur(password)
        checkblur(email)
        checkblur(phone)
        if( checkValue(firstname) == 100 &&
            checkValue(lastname) == 100 &&
            checkValue(username) == 100 &&
            checkValue(comfirm) == 100 &&
            checkValue(password) == 100 &&
            checkValue(email) == 100 &&
            checkValue(phone) == 100){
                if(comfirm.value != password.value){
                    $(".form-message-error").html("")
                    $(".form-message-error").append("Mật khẩu bạn nhập chưa đúng")
                }else{
                    const data = await $.ajax({
                        url: "/user/regiser",
                        type: "POST",
                        data: {
                            firstname: $("#firstName").val(),
                            lastname: $("#lastName").val(),
                            username: $("#username").val(),
                            comfirm: $("#comfirm").val(),
                            password: $("#password").val(),
                            birthday: $("#birthday").val(),
                            email: $("#email").val(),
                            phone: $("#phone").val(),
                        }
                    })
                    if(data.status == 200){
                        alert(data.mess)
                        window.location.href = "/login"
                    }else if(data.status == 400){
                        $(".form-message-error").html("")
                        $(".form-message-error").append(data.mess)
                    }
                }
           
        }
       
    } catch (error) {
        console.log(error);
    }
}

function gohome(){
    window.location.href = "/"
}