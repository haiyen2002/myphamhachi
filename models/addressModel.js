const mongoose = require("./dbconnect");
const Schema = mongoose.Schema;

let UserAddressSchema = new Schema(
  {
    userId: String,
    address: String,
    firstName: String,
    lastName: String,
    phone: Number,
  },
  {
    collection: "useraddress",
  }
);

let UserAddressModel = mongoose.model("useraddress", UserAddressSchema);

module.exports = UserAddressModel;