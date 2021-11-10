
  async function addProduct() {
    try {
        const nameprd = document.querySelector("#nameprd")
        const prd_key = document.querySelector("#prd_key")
        const price = document.querySelector("#price")
        const quantity = document.querySelector("#quantity")
        checkValue(nameprd)
        checkValue(prd_key)
        checkValue(price)
        checkValue(quantity)
        checkblur(nameprd)
        checkblur(prd_key)
        checkblur(price)
        checkblur(quantity)
        const form = document.querySelector("form");
        const formData = new FormData(form);
        formData.set('descriptionDetails', CKEDITOR.instances.editor.getData());
        if( checkValue(nameprd) == 100 && checkValue(prd_key) == 100 && checkValue(quantity) == 100 && checkValue(price) == 100){
            const res = await $.ajax({
                url: "/admin/addProduct",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
              });
              if (res.status == 200) {
                alert(res.mess);
                window.location.href = "";
              }else if(res.status == 400){
                $(".form-message-error").html("")
                $(".form-message-error").append(`${res.mess}`)
              }
        }
    } catch (error) {
      console.log(error);
    }
  }
