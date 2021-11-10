function edit(id){
    $(`#modal_Status_${id}`).css("display", "flex")
    $(".change_Status").attr("onclick", `StatusUpdate('${id}')`)
}

async function StatusUpdate(id){
    try {
        let status = $(`#select_Status_${id}`).val()
        const data = $.ajax({
            url: `/admin/updateStatus/${id}`,
            type: "put",
            data: {status}
        })
       
  
            window.location.href = ""
     
    } catch (error) {
        console.log(error);
    }
}