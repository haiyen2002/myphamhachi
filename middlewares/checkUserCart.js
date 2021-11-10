//mỗi middle ware chỉ đc
module.exports.checkUserCart = async (req, res, next) => {
    try {
      const user = req.user;
      if(user){
        const cart = user.Cart.length;
        res.locals.cartNum = cart;
      }else{
        res.locals.cartNum = 0;
      }
  
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  };