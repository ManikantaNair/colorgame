const express = require("express");

const router = express.Router();
const {
  createPaymentOrder,
  checkSuccessPayment,
  getBalance,
} = require("../controller/payment");

const { protect } = require("../middleware/auth");

router.post("/orders", protect, createPaymentOrder);
router.post("/success", protect, checkSuccessPayment);
router.get("/getbalance", protect, getBalance);
module.exports = router;
