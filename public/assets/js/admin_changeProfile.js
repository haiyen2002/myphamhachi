function showPreview(event) {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
    }
  }
  
  async function changeProfile() {
    try {
      const form = document.getElementById("form-main_profile");
      const formData = new FormData(form);
      const res = await $.ajax({
        url: "/admin/changeProfile",
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
      });
      if (res.status == 200) {
        alert(res.mess);
        window.location.href = "";
      }
    } catch (error) {
      console.log(error);
    }
  }
  