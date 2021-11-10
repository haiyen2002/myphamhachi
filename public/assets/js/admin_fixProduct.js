
async function fixProduct(id){
    $(`#modal_fixProduct_${id}`).css("display", "flex")
    $(".comfirm_Fix").attr("onclick", `comfirmUpdate('${id}')`)
}


async function comfirmUpdate(id){
    try{
    const form = document.getElementById(`form_FixProduct_${id}`);
    const formData = new FormData(form);
    console.log( CKEDITOR.instances[`editor_${id}`].getData());
    formData.set(`des`, CKEDITOR.instances[`editor_${id}`].getData());
    const res = await $.ajax({
      url: `/admin/fixProduct/${id}`,
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