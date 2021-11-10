const router = require("express").Router();
const prdController = require("../controllers/prdController");

router.post("/find", prdController.findPrd)

router.get("/detail/:id", prdController.prdDetail);

router.post("/search", prdController.postSearch)

module.exports = router;
