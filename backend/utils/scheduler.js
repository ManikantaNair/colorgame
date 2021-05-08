const schedule = require("node-schedule");

const Game = require("../models/Game");
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
};
