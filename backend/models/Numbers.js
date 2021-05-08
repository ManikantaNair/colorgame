const mongoose = require("mongoose");

const NumbersSchema = new mongoose.Schema({
  numbers: {
    type: Number,
  },
  colorId: {
    type: mongoose.Schema.ObjectId,
    ref: "color",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Number", NumbersSchema);
