
async function upCart(){
    try {
        const res = await $.ajax({
            url: "/cart/check",
            type: "GET"
        })
        if(res.status == 200 ){
            const cart = res.data.Cart
            let productInCart = [];
            for (let i = 0; i < cart.length; i++) {
                let obj = {
                  basePrice: cart[i].productId.price,
                  count: cart[i].quantity,
                  id: cart[i].productId._id,
                  name: cart[i].productId.name,
                  price: cart[i].productId.price,
                  image: cart[i].productId.img[0],
                };
                productInCart.push(obj);
              }
              localStorage.setItem("shoppingCart", JSON.stringify(productInCart));
        }else{
            console.log(res.mess);
        }
        
    } catch (error) {
        console.log(error);
    }
}
