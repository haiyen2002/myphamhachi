const { accountmodel } = require("../models/db_mongoose");
const jwt = require("jsonwebtoken");
const { response } = require("express");

module.exports.checkUser = async (req, res, next) => {
  try {
    const token = req.cookies.user;
    const result = jwt.verify(token, "Auth");
    const user = await accountmodel.findById(result.id);
    req.user = user;
    if(req.user){
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
