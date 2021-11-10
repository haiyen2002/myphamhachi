const mongoose = require("../models/dbconnect");
const Backlist = mongoose.Schema(
  {
    token: String,
  },
  { collection: "Backlist" }
);
const UserModel = mongoose.model("Backlist", Backlist);

module.exports = UserModel;
