function checkValue(item){
    let itemValue = item.value
  if(itemValue.trim() == ""){
    item.parentElement.querySelector(".form-message").innerHTML = ""
    item.parentElement.querySelector(".form-message").innerHTML = "Vui lòng nhập trường này"

  }else{
      return 100
  }
}
function checkblur(item){
item.addEventListener("keyup", ()=>{
    item.parentElement.querySelector(".form-message").innerHTML = ""
})
}