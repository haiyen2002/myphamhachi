const router = require("express").Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const model = require("../models/db_mongoose");
const addressUser = require("../models/addressModel");
const bcrypt = require("bcrypt");
const check = require("../controllers/checkAuth");
require("dotenv").config({ path: "../.env" });
const product = model.ProductModel;

const multer = require("multer");
const fs = require("fs");
const UserModel = require("../models/backlist");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

router.get("/listuser", async (req, res) => {
  const showUser = await model.accountmodel.find();
  if (showUser) {
    return res.render("admin/listuseradmin", {
      showUser,
    });
  }
});

router.get("/views/oduser/", async (req, res) => {
  const result = await model.orderssModel
    .find({
      userId: req.query.id,
    })
    .populate("product.productId");
  if (result) {
    return res.render("components/viewOrders", {
      result,
    });
  }
});
router.post(
  "/searchUserOrder",
  check.checkLogin,
  check.checkAdmin,
  async (req, res) => {
    var result = [];
    const resultdata = await model.orderssModel
      .find({
        userId: req.body.id,
      })
      .populate("product.productId");
    for (let i = 0; i < resultdata.length; i++) {
      if (resultdata[i]._id.toString().includes(req.body.search)) {
        result.push(resultdata[i]);
      }
    }
    if (resultdata) {
      return res.render("components/showOrderUs", {
        result,
      });
    }
  }
);

router.get(
  "/listProducts/:key",
  check.checkLogin,
  check.checkAdmin,
  async (req, res) => {
    if (req.params.key == "Tất cả") {
      req.params.key = "";
    }
    const Showproduct = await model.ProductModel.find({
      prd_key: { $regex: req.params.key },
    });
    if (Showproduct) {
      return res.render("components/viewProducts", {
        Showproduct,
      });
    }
  }
);

router.get("/listProducts", async (req, res) => {
  const Showproduct = await model.ProductModel.find().limit(9);
  if (Showproduct) {
    return res.render("admin/listProducts", {
      Showproduct,
    });
  }
});

router.get("/getPrd", async (req, res) => {
  const resultPrd = await model.ProductModel.find();
  if (resultPrd) {
    return res.json(resultPrd.length);
  }
});

router.get("/getOrders", async (req, res) => {
  const resultod = await model.orderssModel.find();
  if (resultod) {
    return res.json(resultod.length);
  }
});

router.get("/pageNext", async (req, res) => {
  let perPage = 9;
  const showorders = await model.orderssModel
    .find()
    .skip((req.query.page - 1) * perPage)
    .limit(perPage * 1)
    .populate("userId")
    .populate("product.productId");
  if (showorders) {
    return res.render("components/ViewsOrdersAdmin", {
      showorders,
    });
  }
});

router.get("/editOrders", async (req, res) => {
  const resultdata = await model.orderssModel.find({
    _id: req.params.id,
  });
  if (resultdata) {
    return res.render("components/ViewsOrdersAdmin", {
      showorders,
    });
  }
});

router.get("/change/pagination", async (req, res) => {
  let perPage = 9;
  const Showproduct = await model.ProductModel.find()
    .skip((req.query.page - 1) * perPage)
    .limit(perPage * 1);
  if (Showproduct) {
    return res.render("components/viewProducts", {
      Showproduct,
    });
  }
});

router.get(
  "/listProducts/:key",
  check.checkLogin,
  check.checkAdmin,
  async (req, res) => {
    if (req.params.key == "Tất cả") {
      req.params.key = "";
    }
    const Showproduct = await model.ProductModel.find({
      prd_key: { $regex: req.params.key },
    });
    if (Showproduct) {
      return res.render("components/viewProducts", {
        Showproduct,
      });
    }
  }
);

router.get(
  "/searchprd/:key",
  check.checkLogin,
  check.checkAdmin,
  async (req, res) => {
    const Showproduct = await model.ProductModel.find({
      name: { $regex: req.params.key },
    });
    if (Showproduct.length == 0) {
      return res.render("components/viewProducts", { Showproduct });
    }
    if (Showproduct.length != 0) {
      return res.render("components/viewProducts", {
        Showproduct,
      });
    }
  }
);

router.get(
  "/searchprd",
  check.checkLogin,
  check.checkAdmin,
  async (req, res) => {
    const Showproduct = await model.ProductModel.find({});
    if (Showproduct) {
      return res.render("components/viewProducts", {
        Showproduct,
      });
    }
  }
);

router.get("/addProducts", async (req, res) => {
  return res.render("admin/addProducts");
});

router.get("/listOrders", async (req, res) => {
  const showorders = await model.orderssModel
    .find()
    .populate("userId")
    .populate("product.productId");
  if (showorders) {
    return res.render("admin/orders", {
      showorders,
    });
  }
});

router.post(
  "/update",
  upload.array("image", 10),
  async function (req, res, next) {
    try {
      const arr = [];
      for (let i = 0; i < req.files.length; i++) {
        let index = req.files[i].path.split("public");
        let link = "/public" + index[1];
        arr.push(link.split("\\").join("/"));
      }
      res.json({ status: 200, mess: "success", arr });
    } catch (error) {
      res.json({ status: 500, mess: "loi server", error });
    }
  }
);
router.post("/updatenew", async (req, res) => {
  const dataressult = await model.ProductModel.create({
    name: req.body.name,
    img: req.body["img[]"],
    codeProduct: req.body.codeProduct,
    price: req.body.price,
    quantity: req.body.quantity,
    prd_key: req.body.prd_key,
    descriptionDetails: req.body.descriptionDetails,
    rate: req.body.rate,
  });
  if (dataressult) {
    res.json({ status: 200, mess: "ok", dataressult });
  } else {
    res.json({ status: 400, mess: "ok", dataressult });
  }
});

router.delete("/:id", check.checkLogin, check.checkAdmin, async (req, res) => {
  try {
    const userID = req.params.id;
    const result = await model.accountmodel.deleteOne({ _id: userID });
    if (result.deletedCount !== 0) {
      res.json({ status: 200, mess: "delete finish", result });
    } else {
      res.json({ status: 400, mess: "not find data" });
    }
  } catch (err) {
    res.json({ status: 500, mess: "error server" });
  }
});

router.put(
  "/updateUser/:id",
  check.checkLogin,
  check.checkAdmin,
  async (req, res) => {
    try {
      const userID = req.params.id;
      const result = await model.accountmodel.findByIdAndUpdate(
        { _id: userID },
        {
          role: req.body.role,
        }
      );
      if (result) {
        res.json({ status: 200, mess: "finish", result });
      }
    } catch (error) {}
  }
);

router.post(
  "/updateimageprd",
  upload.array("image", 10),
  async function (req, res, next) {
    try {
      const arr = [];
      for (let i = 0; i < req.files.length; i++) {
        let index = req.files[i].path.split("public");
        let link = "/public" + index[1];
        arr.push(link.split("\\").join("/"));
      }
      res.json({ status: 200, mess: "success", arr });
    } catch (error) {
      res.json({ status: 500, mess: "loi server", error });
    }
  }
);

router.put(
  "/updateProduct/:id",
  check.checkLogin,
  check.checkAdmin,
  async (req, res) => {
    try {
      const prdID = req.params.id;
      if (req.body["img[]"]) {
        const result = await model.ProductModel.findByIdAndUpdate(
          { _id: prdID },
          {
            name: req.body.name,
            img: req.body["img[]"],
            codeProduct: req.body.codeProduct,
            price: req.body.price,
            quantity: req.body.quantity,
            prd_key: req.body.prd_key,
            descriptionDetails: req.body.descriptionDetails,
            rate: req.body.rate,
          }
        );
        if (result) {
          return res.json({ status: 200, mess: "finish", result });
        }
      } else {
        const result = await model.ProductModel.findByIdAndUpdate(
          { _id: prdID },
          {
            name: req.body.name,
            codeProduct: req.body.codeProduct,
            price: req.body.price,
            quantity: req.body.quantity,
            prd_key: req.body.prd_key,
            descriptionDetails: req.body.descriptionDetails,
            rate: req.body.rate,
          }
        );
        if (result) {
          return res.json({ status: 200, mess: "finish", result });
        }
      }
    } catch (error) {
      res.json({ status: 500, mess: "Error server", error });
    }
  }
);

router.delete(
  "/deletePrd/:id",
  check.checkLogin,
  check.checkAdmin,
  async (req, res) => {
    let checks = false;
    try {
      const PRDID = req.params.id;
      const checkorders = await model.orderssModel
        .find({})
        .populate("product.productId");

      for (let i = 0; i < checkorders.length; i++) {
        if (checkorders[i].product[0].productId._id.toString() == PRDID) {
          checks = true;
        }
      }
      if ((checks = true)) {
        res.json({
          status: 204,
          mess: "sản phẩm tồn tại trong orders",
        });
      }
      if ((checks = false)) {
        const result = await model.ProductModel.deleteOne({ _id: PRDID });
        if (result.deletedCount !== 0) {
          res.json({ status: 200, mess: "delete finish", result });
        } else {
          res.json({ status: 400, mess: "not find data" });
        }
      }
    } catch (err) {
      res.json({ status: 500, mess: "error server", err });
    }
  }
);

router.get(
  "/userorders/:id",
  check.checkLogin,
  check.checkAdmin,
  async (req, res) => {
    try {
      const result = await model.orderssModel.find({
        userId: req.params.id,
      });
      if (result) {
        res.json({ status: 200, result });
      } else {
        res.json({ status: 300, mess: "user not orders" });
      }
    } catch (error) {
      res.json({ status: 500, mess: "Err server" + error });
    }
  }
);

router.post(
  "/update_status_order",
  check.checkLogin,
  check.checkAdmin,
  async (req, res) => {
    try {
      const result = await model.orderssModel.findByIdAndUpdate(
        { _id: req.body.id },
        {
          status: req.body.status,
        }
      );
      if (result) {
        res.json({ status: 200, mess: "finish", result });
      }
    } catch (error) {}
  }
);

module.exports = router;
