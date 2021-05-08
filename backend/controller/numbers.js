const Numbers = require("../models/Numbers");
const Color = require("../models/Color");

const asyncHandler = require("../middleware/async");
exports.getNumbers = asyncHandler(async (req, res, next) => {
  const numbers = await Numbers.find();
  if (!numbers) {
    return res.status(404).json({
      message: "No colors found",
    });
  }
  res.status(200).json({
    success: true,
    data: numbers,
  });
});

exports.createNumbers = asyncHandler(async (req, res, next) => {
  const color = await Color.findById(req.params.colorId);
  console.log(color);

  const numbers = new Numbers({
    numbers: req.body.numbers,
    colorId: color._id,
  });
  await numbers.save();
  res.status(201).json({
    success: true,
    message: "Number created",
    data: numbers,
  });
});
