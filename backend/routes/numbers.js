const express = require("express");

const router = express.Router({ regParams: true });
const { getNumbers, createNumbers } = require("../controller/numbers");
const { protect } = require("../middleware/auth");

router.get("/", protect, getNumbers);
router.post("/:colorId/create", createNumbers);

module.exports = router;
