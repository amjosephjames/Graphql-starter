const mongoose = require("mongoose");

const quoteModel = new mongoose.Schema({
  quotation: {
    type: String,
  },
  author: {
    type: String,
  },
});
module.exports = mongoose.model("quotes", quoteModel);
