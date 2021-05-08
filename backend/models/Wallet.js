const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  totalBalance: {
    type: Number,
  },

  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  status: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Wallet", WalletSchema);
