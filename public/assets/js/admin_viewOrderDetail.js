function OffmodalViewOrderDetail(){
    $(".modal_viewOrder").css("display", "none")
    }

    $(".close_viewOrder").on("click", OffmodalViewOrderDetail)
    $(".modal_viewOrder").on("click", OffmodalViewOrderDetail)

    $(".box_viewOrder").on("click", (event) => {
    event.stopPropagation();
    });
    
function viewOrderDetail(id){
    $(`#modal_viewOrder_${id}`).css("display", "flex")
    
    }

