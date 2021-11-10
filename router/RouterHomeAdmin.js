const router = require("express").Router();
const path = require("path");
const check = require("../controllers/checkAuth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const model = require("../models/db_mongoose");

router.post("/login", async (req, res) => {
  try {
    const checkUser = await model.accountmodel.findOne({
      username: req.body.username,
    });
    if (checkUser) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        checkUser.password
      );
      if (checkPassword) {
        const token = jwt.sign({ id: checkUser._id }, "Auth", {
          expiresIn: "30d",
        });
        const id = jwt.verify(token, "Auth").id;
        const resultdata = await model.accountmodel.findOne({ _id: id });
        if (
          (resultdata && resultdata.role == "admin") ||
          resultdata.role == "Admin"
        ) {
          res.json({ status: 200, id: token, mess: "ok" });
        } else {
          res.json({ status: 400, mess: "ban khong co quyen admin" });
        }
      } else {
        res.json({ status: 400, mess: "sai password" });
      }
    } else {
      res.json({ status: 400, mess: "sai username" });
    }
  } catch (error) {
    res.json({ error, mess: "server error", status: 500 });
  }
});

router.post("/checkLogin", async (req, res) => {
  try {
    if (req.cookies.user) {
      const token = req.cookies.user;
      const checkToken = await BlackListModel.findOne({ token });
      if (checkToken) {
        res.json({ mess: "cookie bị hạn chế", status: 400 });
      } else {
        const id = jwt.verify(token, "Auth").id;
        const checkUser = await model.accountmodel.findOne({ _id: id });
        if (checkUser) {
          return res.json({
            mess: "user da dang nhap",
            id,
            checkUser,
            status: 200,
          });
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
});

router.post("/logout", async (req, res) => {
  try {
    await BlackListModel.create({ token: req.cookies.user });
    res.json({ status: 200, mess: "ok" });
  } catch (error) {
    res.json({ error, mess: "server error", status: 500 });
  }
});

module.exports = router;
