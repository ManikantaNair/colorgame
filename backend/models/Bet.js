const mongoose = require("mongoose");

const BetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },
  colorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "color",
  },

  amount: {
    type: Number,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Bet", BetSchema);
