
async function editNews(id){
    $(`#modal_fixNews_${id}`).css("display", "flex")
    $(".comfirm_Fix").attr("onclick", `comfirmUpdateNews('${id}')`)
}


async function comfirmUpdateNews(id){
    try{
    const form = document.getElementById(`form_FixNews_${id}`);
    const formData = new FormData(form);
    console.log( CKEDITOR.instances[`editor_${id}`].getData());
    formData.set(`description`, CKEDITOR.instances[`editor_${id}`].getData());
    const res = await $.ajax({
      url: `/admin/fixNews/${id}`,
      type: "put",
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