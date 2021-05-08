const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  changeNickName,
} = require("../controller/auth");

const router = express.Router();
const { protect } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/:id/changenickname", protect, changeNickName);
module.exports = router;
