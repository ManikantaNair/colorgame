const express = require("express");

const router = express.Router();
const { getColors, createColors } = require("../controller/colors");

router.get("/", getColors);
router.post("/", createColors);

module.exports = router;
