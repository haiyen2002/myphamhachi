const router = require("express").Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/db_mongoose");
const bcrypt = require("bcrypt");
const Check = require("../controllers/checkAuth");
const BlackListModel = require("../models/backlist");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

router.get("/dangky", (req, res) => {
    res.render("siginUser")
  });

router.get("/", Check.checkAdmin, async (req, res) => {
  const showUser = await UserModel.accountmodel.find();
  if (showUser) {
    return res.json(showUser);
  }
});

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const checkuser = await UserModel.accountmodel.findOne({
      username: req.body.username,
    });
    if (checkuser) {
      res.json({ status: 400, mess: "Error username" });
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const newuser = await UserModel.accountmodel.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        birthday: req.body.birthday,
        gender: req.body.gender,
        email: "",
        phone: "",
        createdAt: new Date().toUTCString(),
        Cart: [],
      });
      if (newuser) {
        res.json({ status: 200, mess: "success" });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ status: 500, mess: "Error server" });
  }
});

router.post("/changepass", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const result = await UserModel.accountmodel.findOneAndUpdate(
      {
        username: req.body.username,
      },
      {
        password: req.body.password,
      }
    );
    if (result) {
      res.json(result);
    }
  } catch (error) {
    res.json(error);
  }
});

router.post("/available", async (req, res) => {
  try {
    const checkUser = await UserModel.accountmodel.findOne({
      username: req.body.username,
    });
    if (checkUser) {
      res.json({ status: 200, mess: "true" });
    } else {
      res.json({ status: 400, mess: "false" });
    }
  } catch (error) {
    res.json({ error, mess: "server error", status: 500 });
  }
});

router.post("/login", async (req, res) => {
  try {
    const checkUser = await UserModel.accountmodel.findOne({
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
        const resultdata = await UserModel.accountmodel.findOne({ _id: id });
        if (resultdata) {
          res.json({ status: 200, id: token, mess: "ok", data: resultdata });
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
        const checkUser = await UserModel.accountmodel.findOne({ _id: id });
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
router.post(
  "/update",
  upload.single("thumbnail"),
  async function (req, res, next) {
    try {
      let index = req.file.path.split("images");
      let link = "public/images" + index[1];
      console.log(link);
      res.json({ status: 200, mess: "success", link });
    } catch (error) {
      res.json({ status: 500, mess: "loi server", error });
    }
  }
);

router.post("/updatenew", (req, res) => {
  UserModel.accountmodel
    .updateOne(
      {
        username: req.body.username,
      },
      {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        birthday: req.body.birthday,
        email: req.body.email,
        phone: req.body.phone,
        avatar: req.body.avatar,
      }
    )
    .then((data) => {
      res.json(222, data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/unlink", async (req, res) => {
  const checkname = await UserModel.accountmodel.findOne({
    username: req.body.username,
  });
  if (checkname) {
    fs.unlinkSync((__dirname + checkname.avatar).replace("\\router", ""));
  }
});

router.get("/:id", (req, res) => {
  UserModel.accountmodel
    .findOne({ _id: req.params.id })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});


router.post("/regiser", async (req, res) => {
    try {
      console.log(req.body);
      const checkuser = await UserModel.accountmodel.findOne({
        username: req.body.username,
      });
      const checkPhone = await UserModel.accountmodel.findOne({
          phone : req.body.phone
      })
      const checkEmail = await UserModel.accountmodel.findOne({
          email : req.body.email
      })
      if (checkuser) {
        res.json({ status: 400, mess: "Username đã tồn tại" });
      }
      else if(checkPhone){
        res.json({ status: 400, mess: "Số điện thoại đã được dùng" });
      }else if(checkEmail){
        res.json({ status: 400, mess: "Email đã được sử dụng" });
      }
      else {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const newuser = await UserModel.accountmodel.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          password: req.body.password,
          birthday: req.body.birthday,
          email: req.body.email,
          phone: req.body.phone,
          createdAt: new Date().toUTCString(),
          Cart: [],
        });
        if (newuser) {
          res.json({ status: 200, mess: "Tạo tài khoản thành công" });
        }
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 500, mess: "Lỗi server" });
    }
  });



 

module.exports = router;
