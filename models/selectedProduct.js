const mongoose = require("../models/dbconnect");
const Schema = mongoose.Schema;

let SelectedProduct = new Schema(
  {
    userId: String,
    productId: {
      type: String,
      ref: "Products",
    },
    quantity: Number,
  },
  {
    collection: "selectedProduct",
  }
);

let SelectedProductModel = mongoose.model("selectedProduct", SelectedProduct);
module.exports = SelectedProductModel;
