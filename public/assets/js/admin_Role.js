function changeRole(id){
    $(`#modal_Role_${id}`).css("display", "flex")
    $(".change_Role").attr("onclick", `RoleUpdate('${id}')`)
}

async function RoleUpdate(id){
    try {
        let role = $(`#select_Role_${id}`).val()
        const data = $.ajax({
            url: `/admin/updateRole/${id}`,
            type: "put",
            data: {role}
        })
       
  
            window.location.href = ""
     
    } catch (error) {
        console.log(error);
    }
}