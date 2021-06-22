const Game = require("../models/Game");
const moment = require("moment-timezone");
const Bet = require("../models/Bet");
const mongoose = require("mongoose");
const Number = require("../models/Numbers");
const Result = require("../models/Result");
const Wallet = require("../models/Wallet");

const asyncHandler = require("../middleware/async");
const { findOne } = require("../models/Game");
exports.getGame = asyncHandler(async (req, res, next) => {
  const game = await Game.findOne({ status: true });
  if (!game) {
    return res.status(404).json({
      message: "No Games found",
    });
  }
  res.status(200).json({
    game,
  });
});

exports.getGameTimer = asyncHandler(async (req, res, next) => {
  // const beforeGame = await Game.findOne({ status: true });
  // const date = moment.utc().format("YYYY-MM-DD HH:mm:ss");
  // const dateUTC = moment.utc(date).toDate();
  // const local = moment(dateUTC)
  //   .tz("Asia/Kolkata")
  //   .format("YYYY-MM-DD HH:mm:ss");
  // const endTimes = beforeGame.endTime;
  // console.log(endTimes);
  // const now = new Date();
  // console.log(now);
  // return;
  // const distance = endTimes - now;
  // res.json({
  //   date: distance,
  // });
  // const enteredDate = beforeGame.createdAt.getTime();
  // const now = new Date().getTime();
  // const distance = now - enteredDate;
  // res.json({
  //   date: distance,
  // });
  // const game = await Game.findOne({ status: true });
  // const endGame = game.endTime;
  // const now = new Date();

  // res.json({
  //   date: {
  //     game: endGame,
  //     now: now,
  //   },
  // });
  const game = await Game.findOne({ status: true });
  const local = moment(game.endTime)
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD HH:mm:ss");

  res.json({
    date: local,
  });
});

exports.createGameBet = asyncHandler(async (req, res, next) => {
  const { gameId, amount, colorId } = req.body;
  console.log(gameId, amount, colorId);
  const bet = new Bet({
    gameId,
    amount,
    colorId,
    userId: req.user.id,
  });

  await bet.save();
  const userWallet = await Wallet.findOne({ userId: req.user.id });
  console.log(userWallet);
  const numAmount = parseInt(req.body.amount);

  if (userWallet) {
    userWallet.totalBalance -= numAmount;
    await userWallet.save();
  }
  res.status(200).json({
    success: true,
    message: "Bet created",
    data: bet,
  });
});

exports.calcResult = asyncHandler(async (req, res, next) => {
  // const bets = await Bet.find({ gameId: req.params.gameId });
  const bets = await Bet.aggregate([
    {
      $match: {
        gameId: mongoose.Types.ObjectId(req.params.gameId),
      },
    },
    {
      $group: {
        _id: "$colorId",
        count: { $sum: 1 },
        // maxCount: { $max: "$colorId" },
      },
    },
    {
      $sort: { count: 1 },
    },
    {
      $limit: 1,
    },
  ]);
  console.log(bets);
  const numbers = await Number.find({ colorId: bets[0]._id });
  console.log(numbers);

  let numArr = [];
  numbers.forEach((number) => {
    numArr.push(number.numbers);
  });
  let randnumbers = numArr[Math.floor(Math.random() * numArr.length)];
  const result = new Result({
    gameId: req.params.gameId,
    colorId: bets[0]._id,
    randnumbers,
  });

  await result.save();
  res.json({
    success: true,
    message: `Result added for ${req.params.gameId} game`,
  });
});

exports.getResult = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  const game = await Result.find({ gameId: req.params.gameId })
    .populate({
      path: "colorId",
      select: "colorName",
    })
    .populate({
      path: "gameId",
      select: "gamePeriodId",
    });
  res.status(200).json({
    success: true,
    data: game,
  });
});

// payout to user

exports.sendCash = asyncHandler(async (req, res, next) => {
  // const bets = await Bet.find({ gameId: req.params.gameId });
  const bets = await Bet.aggregate([
    {
      $match: {
        gameId: mongoose.Types.ObjectId(req.params.gameId),
      },
    },
    {
      $group: {
        _id: "$colorId",
        count: { $sum: 1 },
        // maxCount: { $max: "$colorId" },
      },
    },
    {
      $sort: { count: 1 },
    },
    {
      $limit: 1,
    },
  ]);
  console.log(bets);

  const userBet = await Bet.findOne({ userId: req.user.id });
  // console.log(typeof userBet);
  const newUserBet = userBet.toObject({ getters: true });
  // console.log(typeof newUserBet.colorId);

  if (bets[0]._id.toString() === newUserBet.colorId.toString()) {
    const money = newUserBet.amount * 2;
    console.log(newUserBet.amount);

    const userWallet = await Wallet.findOne({ userId: req.user.id });
    console.log(userWallet);
    const numAmount = parseInt(money);

    if (userWallet) {
      userWallet.totalBalance += numAmount;
      await userWallet.save();
    }
  } else {
    console.log("hello");
  }

  res.status(200).json({
    message: "success you have been credited",
  });
});
