require("dotenv").config({ path: "./config.env" });
const express = require("express");
var cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

connectDB();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res, next) => {
  res.send("Flocast API running");
});

// Connecting Routes
app.use("/govUser", require("./routes/govAuth"));
app.use("/user", require("./routes/govAuth"));
app.use("/citizen", require("./routes/citizen"));
app.use("/sms", require("./routes/sendSMS"));
app.use("/image", require("./routes/crowdData"));
// app.use("/flood", require("./routes/crowdData"));
// app.use("/api/private", require("./routes/private"));

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
