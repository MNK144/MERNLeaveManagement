const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const verifyJWT = require("./middlewares/verifyJWT");
require("dotenv").config();

const auth = require("./routes/auth");
const leave = require("./routes/leave");

app.use(express.json());
app.use(cors());

const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@leavemanagement.ezh3nbv.mongodb.net/leavemanagementdb?retryWrites=true&w=majority`;
mongoose.set("strictQuery", true);
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("Error Connecting to MongoDB:", err));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Employee Leave Management API" });
});

app.use("/auth", auth.router);
app.use(verifyJWT);

app.use("/leave", leave.router);

app.listen(process.env.PORT, () => {
  console.log(
    "Employee Leave Management Server Started on Port:",
    process.env.PORT
  );
});
