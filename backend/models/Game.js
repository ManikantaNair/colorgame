const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  gamePeriodId: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
  endTime: {
    type: Date,
  },
});

module.exports = mongoose.model("Game", GameSchema);
