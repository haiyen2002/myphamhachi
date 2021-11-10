const { count } = require("console");
const express = require("express");
const { parse } = require("path");
const router = express.Router();
var path = require("path");
var productController = require("../controllers/ProductsController");
router.get("/", (req, res) => {
  productController
    .getTypePrd()
    .then((types) => {
      res.render("filter/filter", {
        types: types,
      });
    })
    .catch((err) => console.log(err));
  
});

//pagina

router.post("/paging_filter", async (req, res) => {
  const type = req.body.type;
  var number = req.body.number;

  const types = await productController.getTypePrd();
  productController
    .findPrdByType(type)
    .skip(parseInt(number))
    .limit(6)
    .then((products) => {
      res.status(200).json({
        products: products,
        types: types,
      });
    })
    .catch((err) => console.log(err));
});
//pagination filter:
//page nhận lại page ở client truyền lên
router.post("/:page", async (req, res) => {
  try {
    let perPage = 3; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.params.page || 1;//nếu ko có params mặc định page la 1
    // lay type, min, max tu client
    const type = req.body.type;
    const min = req.body.min;
    const max = req.body.max;
    const textF = req.body.textF;
  
    //get all type
    //lay product ung vơi type min max
    productController
      .customProduct(type, min, max, textF)
      .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)//giới hạn sản phẩm trong một pages
      .exec((err, products) => {//products là những sản phẩm trong page đó được trả về tương ứng
        productController
          .customProduct(type, min, max, textF)
          .countDocuments((err, count) => {//đếm toàn bộ sản phẩm trong điều kiện thỏa mãn type min max và textF
            // đếm để tính có bao nhiêu trang
            // if (err) return next(err);
            res.status(200).json({
              products, // sản phẩm trên một page
              current: page, // page hiện tại
              pages: Math.ceil(count / perPage), // tổng số các page
              // types
            });
          });
      });
  } catch (error) {
    res.status(500).json({
      err: true,
      message: "Lỗi server",
    });
  }
});
module.exports = router;
