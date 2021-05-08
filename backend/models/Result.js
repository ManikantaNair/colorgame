const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  gameId: {
    type: mongoose.Schema.ObjectId,
    ref: "Game",
  },
  colorId: {
    type: mongoose.Schema.ObjectId,
    ref: "Color",
  },
  randnumbers: {
    type: Number,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Result", ResultSchema);
