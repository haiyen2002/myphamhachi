function deleteNews(id){
    $(`#modal_delete_${id}`).css("display", "flex")
    $(".comfirm_delete").attr("onclick", `comfirmDeleteNews('${id}')`)
}

async function comfirmDeleteNews(id){
    try {
        const data = $.ajax({
            url: `/admin/deleteNews/${id}`,
            type: "DELETE",
        })
        console.log(data);
        // alert(data.mess)      
        window.location.href = "";
    } catch (error) {
        console.log(error);
    }
}