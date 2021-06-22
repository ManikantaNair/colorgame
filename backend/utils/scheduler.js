const schedule = require("node-schedule");

const Game = require("../models/Game");
const Bet = require("../models/Bet");
const Number = require("../models/Numbers");
const mongoose = require("mongoose");
const Result = require("../models/Result");
exports.scheduler = () => {
  // schedule.scheduleJob("m-job", "*/3 * * * *", async () => {
  //   const games = await Game.findOneAndUpdate(
  //     { status: true },
  //     { status: false },
  //     { new: true }
  //   );
  //   const gameperiodInc = games.gamePeriodId + 1;
  //   const time = new Date().getTime();
  //   const newTime = time + 180000;
  //   const endTime = new Date(newTime);
  //   const game = new Game({
  //     gamePeriodId: gameperiodInc,
  //     createdAt: new Date(),
  //     endTime: endTime,
  //   });
  //   await game.save();
  //   console.log("Game created successfully");
  // });
  // schedule.scheduleJob("calcResult", "* * * * *", async () => {
  // //   const game = await Game.find({ status: true });
  // //   console.log(game[0]);
  // //   const bets = await Bet.aggregate([
  // //     {
  // //       $match: {
  // //         gameId: mongoose.Types.ObjectId(game[0]._id),
  // //       },
  // //     },
  // //     {
  // //       $group: {
  // //         _id: "$colorId",
  // //         count: { $sum: 1 },
  // //         // maxCount: { $max: "$colorId" },
  // //       },
  // //     },
  // //     {
  // //       $sort: { count: 1 },
  // //     },
  // //     {
  // //       $limit: 1,
  // //     },
  // //   ]);
  // //   console.log(bets);
  // //   const numbers = await Number.find({ colorId: bets[0]._id });
  // //   console.log(numbers);
  // //   let numArr = [];
  // //   numbers.forEach((number) => {
  // //     numArr.push(number.numbers);
  // //   });
  // //   let randnumbers = numArr[Math.floor(Math.random() * numArr.length)];
  // //   const result = new Result({
  // //     gameId: game[0]._id,
  // //     colorId: bets[0]._id,
  // //     randnumbers,
  // //   });
  // //   await result.save();
  // //   console.log("result added");
  // // });
};
