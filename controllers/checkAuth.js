const UserModel = require("../models/db_mongoose");
const jwt = require("jsonwebtoken");
const BlackListModel = require("../models/backlist");

async function checkLogin(req, res, next) {
  try {
    if (req.cookies.user) {
      const token = req.cookies.user;
      const checkToken = await BlackListModel.findOne({ token });
      if (checkToken) {
        res.json({ mess: "cookie bị hạn chế", status: 400 });
      } else {
        const id = jwt.verify(token, "Auth").id;
        const checkUser = await UserModel.accountmodel.findOne({ _id: id });
        if (checkUser) {
          req.role = checkUser.role;
          next();
        } else {
          res.json({ mess: "cookie khong hop le", status: 400 });
        }
      }
    } else {
      res.json({ mess: "chua dang nhap", status: 400 });
    }
  } catch (error) {
    res.json({ error, mess: "server error", status: 500 });
  }
}

async function checkAdmin(req, res, next) {
  if (req.role == "admin") {
    next();
  } else {
    res.json({ status: 400, mess: "khong co quyen admin" });
  }
}

module.exports = { checkLogin, checkAdmin };
