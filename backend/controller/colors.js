const Color = require("../models/Color");

const asyncHandler = require("../middleware/async");
exports.getColors = asyncHandler(async (req, res, next) => {
  const colors = await Color.find();
  if (!colors) {
    return res.status(404).json({
      message: "No colors found",
    });
  }
  res.status(200).json({
    colors,
  });
});

exports.createColors = asyncHandler(async (req, res, next) => {
  const color = await Color.create(req.body);

  res.status(201).json({
    success: true,
    message: "Color created",
    data: color,
  });
});
