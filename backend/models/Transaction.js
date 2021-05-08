const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  razorpay_payment_id: {
    type: String,
  },

  razorpay_order_id: {
    type: String,
  },

  razorpay_signature: {
    type: String,
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

module.exports = mongoose.model("Transaction", TransactionSchema);
