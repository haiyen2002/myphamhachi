function OffmodalViewOrder(){
    $(".modal_viewOrder").css("display", "none")
    }

    $(".close_viewOrder").on("click", OffmodalViewOrder)
    $(".modal_viewOrder").on("click", OffmodalViewOrder)

    $(".box_viewOrder").on("click", (event) => {
    event.stopPropagation();
    });
    
function view(id){
    $(`#modal_viewOrder_${id}`).css("display", "flex")
    
    }

