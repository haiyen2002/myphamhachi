const mongoose = require("../models/dbconnect");
const Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    imgNews: String,
    title: String,
    content: String,
    description: String,
    dateSubmit: Date
  },
  {
    collection: "news",
  }
);

const newsModel = mongoose.model("news", newsSchema);
module.exports = newsModel;

