
  async function news() {
    try {
        const form = document.querySelector("form");
        const formData = new FormData(form);
        formData.set('description', CKEDITOR.instances.editor.getData());
        const res = await $.ajax({
            url: "/admin/addNews",
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
    } catch (error) {
      console.log(error);
    }
  }
