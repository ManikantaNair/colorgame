const express = require("express");

const router = express.Router({ regParams: true });
const {
  getGame,
  getGameTimer,
  createGameBet,
  calcResult,
  getResult,
  sendCash,
} = require("../controller/game");
const { protect } = require("../middleware/auth");

router.get("/", getGame);
router.get("/timer", getGameTimer);
router.post("/createBet", protect, createGameBet);
router.post("/calcresult/:gameId", calcResult);
router.get("/getresult/:gameId", getResult);
router.get("/sendcash/:gameId", protect, sendCash);
module.exports = router;
