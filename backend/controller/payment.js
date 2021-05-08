const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Transaction = require("../models/Transaction");
const Wallet = require("../models/Wallet");

exports.createPaymentOrder = asyncHandler(async (req, res, next) => {
  const instance = new Razorpay({
    key_id: "rzp_test_uMdSD2Q1oqNLu0",
    key_secret: "YMpn2hJ4OJfonq0qKpAE4KhW",
  });

  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "receipt_order_74394",
  };
  const order = await instance.orders.create(options);
  if (!order) return res.status(500).send("Order Id couldnt be fetched");

  const wallet = await Wallet.findOne({ userId: req.user.id });

  const numAmount = parseInt(req.body.amount);

  if (wallet) {
    wallet.totalBalance += numAmount;
    await wallet.save();
  } else {
    const newWallet = new Wallet({
      totalBalance: req.body.amount,
      userId: req.user.id,
    });
    await newWallet.save();
  }
  res.status(200).json({
    success: true,
    data: order,
  });
});

exports.checkSuccessPayment = asyncHandler(async (req, res, next) => {
  console.log("hello");
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = req.body;

  // Creating our own digest
  // The format should be like this:
  // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
  const shasum = crypto.createHmac("sha256", "YMpn2hJ4OJfonq0qKpAE4KhW");

  shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

  const digest = shasum.digest("hex");

  // comaparing our digest with the actual signature
  if (digest !== razorpaySignature)
    return res.status(400).json({ msg: "Transaction not legit!" });

  // THE PAYMENT IS LEGIT & VERIFIED
  // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

  const transaction = new Transaction({
    razorpay_payment_id: razorpayPaymentId,
    razorpay_order_id: razorpayOrderId,
    razorpay_signature: razorpaySignature,
    userId: req.user.id,
  });
  await transaction.save();

  res.json({
    msg: "success",
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
  });
});

exports.getBalance = asyncHandler(async (req, res, next) => {
  const wallet = await Wallet.findOne({ userId: req.user.id });
  if (!wallet) {
    return res.json({ sucess: "fail", data: { totalBalance: 0.0 } });
  }
  res.json({
    success: "true",
    data: wallet,
  });
});
