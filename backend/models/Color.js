const mongoose = require("mongoose");
const moment = require("moment-timezone");

const ColorSchema = new mongoose.Schema({
  colorName: {
    type: String,
  },
  color: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Color", ColorSchema);
