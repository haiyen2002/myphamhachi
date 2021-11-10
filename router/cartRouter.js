const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { route } = require("./UserRouter");
const {orderssModel} = require("../models/db_mongoose")

// update Cart

router.put("/cart/", cartController.postCart);

//create order

router.post("/order/", cartController.postOrder);

//
router.get("/check", cartController.getUpCart);

//

router.delete("/cancel/:id", cartController.cancelOrder ) 

module.exports = router;