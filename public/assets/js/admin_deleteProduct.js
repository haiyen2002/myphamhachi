function deleteProduct(id){
    $(`#modal_delete_${id}`).css("display", "flex")
    $(".comfirm_delete").attr("onclick", `comfirmDelete('${id}')`)
}

async function comfirmDelete(id){
    try {
        const data = await $.ajax({
            url: `/admin/deleteProduct/${id}`,
            type: "DELETE",
        })
        if(data.status == 200){
            console.log(data);
            alert(data.mess)      
            window.location.href = "";
        }else if(data.status == 400){
            alert(data.mess)
            window.location.href = "";
        }
        
    } catch (error) {
        console.log(error);
    }
}