const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/error");
const cors = require("cors");
// Load env vars
dotenv.config({ path: "./config/config.env" });
const { scheduler } = require("./utils/scheduler");
const moment = require("moment-timezone");
const socketIo = require("socket.io");

const auth = require("./routes/auth");
const payment = require("./routes/Payment");
const colors = require("./routes/colors");
const numbers = require("./routes/numbers");
const game = require("./routes/Game");
const Game = require("./models/Game");
//load DB connection
connectDB();
//body parser
app.use(express.json());
app.use(cors());
//mount routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/payments", payment);
app.use("/api/v1/colors", colors);
app.use("/api/v1/numbers", numbers);
app.use("/api/v1/game", game);

app.use(errorHandler);
scheduler();

//port from env file
const PORT = process.env.PORT || 5000;

//to handle wrong routes
app.all("*", (req, res) => {
  res.status(400).json({
    status: "fail",
    message: "No such route found in this server",
  });
});

//listening to port
const server = app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.MODE} mode in the port ${process.env.PORT}`
  );
});

io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let interval;
io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = async (socket) => {
  // Emitting a new message. Will be consumed by the client
  const game = await Game.findOne({ status: true });
  const gameEnd = game.endTime.getTime();
  const now = new Date();
  const distance = gameEnd - now;
  socket.emit("FromAPI", { distance, game });
};


// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
