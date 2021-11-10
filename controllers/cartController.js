const {
    accountmodel,
    orderssModel,
    ProductModel,
  } = require("../models/db_mongoose")
  
  // update cart
  module.exports.postCart = async (req, res) => {
    try {
      const userId = req.user._id;
      if (userId) {
        const keys = Object.keys(req.body);
        const productInfo = keys.filter((ele) => {
          return ele.includes("prd");
        });
        let product = [];
        for (let i = 0; i < productInfo.length; i += 2) {
            product.push({
            productId: req.body[productInfo[i]],
            quantity: req.body[productInfo[i + 1]],
          });
        }
        const data = await accountmodel.findOneAndUpdate(
          { _id: userId },
          {
            Cart: product,
          }
        );
        if (data) {
            res.json({
            mess: "Cập nhật giỏ hàng thành công",
            status: 200,
            data: data,
          });
        }
      }
    } catch (error) {
         res.json(error);
    }
  };
  
  // create order
  
  module.exports.postOrder = async (req, res, next) => {
    try {
      const userId = req.user._id;
      if (userId) {
        const user = await accountmodel.findOne({ _id: userId });
        if (user.Cart.length > 0) {
            const data = await orderssModel.create({
            product: user.Cart,
            userId: userId,
            totalPrice: req.body.totalPrice,
            orderDate: Date.now().toString(),
            address: req.body.address,
          });
          if (data) {
            let prds = data.product;
            for (let i = 0; i < prds.length; i++) {
              let prd = await ProductModel.findOne({ _id: prds[i].productId });
              if (prd) {
                let total = prd.quantity - prds[i].quantity;
                let update = await ProductModel.findByIdAndUpdate(
                  { _id: prd._id },
                  { quantity: total }
                );
              }
            }
            res.json({
              mess: "Tạo đơn hàng thành công",
              status: 200,
              data: data,
            });
          }
        } else {
          res.json({ status: 400, mess: "Chưa có sản phẩm trong giỏ hàng" });
        }
      }
    } catch (error) {
      res.json(error);
    }
  };
  
  module.exports.getUpCart = async (req, res)=>{
      try {
          const userId = req.user._id
          if(userId){
              const data = await accountmodel.findById(userId)
              .populate("Cart.productId")
              if(data){
                  res.json({mess: "update", data:data, status: 200})
              }else{
                  res.json({status: 400, mess: "loi"})
              }
          }
      } catch (error) {
          res.json(error)
      }
  }
  
  
  module.exports.cancelOrder = async (req, res, next)=>{
      try {
          const orderId = req.params.id
          console.log(orderId);
          const data = await orderssModel.findById(orderId)
          if(data){
              let products = data.product;
              for (let i = 0; i < products.length; i++) {
                  let productBuy = await ProductModel.findById(products[i].productId)
                  if(productBuy){
                      let checkCount = parseInt(productBuy.quantity) + parseInt(products[i].quantity)
                      await ProductModel.findByIdAndUpdate(
                          { _id: productBuy._id },
                          { quantity: checkCount }
                          )
                  }
                  
              }
              await orderssModel.deleteOne({_id: orderId})
             
  
              res.json({
                  mess: "Hủy đơn hàng thành công",
                  status: 200,
              
                });
          }else {
              res.json({ status: 400, mess: "Không tìm thấy đơn hàng" });
            }
          
      } catch (error) {
          res.json({status: 500, error: error, mess: "lỗi sever"})
      }
  }