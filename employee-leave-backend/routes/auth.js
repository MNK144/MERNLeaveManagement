const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/User");
const LeaveBalance = require("../models/LeaveBalance");
require("dotenv").config();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Auth Hello World" });
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password)
      return res.status(400).json({ message: "All Parameters are Required" });
    const user = await Users.findOne({ email: email });
    console.log("User:", user);
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        //Login Success...
        const accessToken = jwt.sign(
          { id: user._id, email: user.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
        );
        const refreshToken = jwt.sign(
          { id: user._id, email: user.email },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
        );
        res.status(200).json({ email: user.email, accessToken, refreshToken });
      } else res.status(401).json({ message: "Invalid Password" });
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const name = req.body.name;
    const role = req.body.role;
    const email = req.body.email;
    const password = req.body.password;
    if (!name || !role || !email || !password)
      return res.status(400).json({ message: "All Parameters are Required" });
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const salt = await bcrypt.genSalt(12);
      const passHash = await bcrypt.hash(password, salt);
      const payload = {
        name,
        email,
        password: passHash,
        role,
      };
      const newUser = await Users.create(payload);
      console.log("NewUser = ", newUser);

      const leaveBalancePayload = {
        casualLeaves: 12,
        sickLeaves: 6,
        userID: newUser._id,
      }
      const newLeaveBalance = await LeaveBalance.create(leaveBalancePayload);
      console.log("LeaveBalance = ",newLeaveBalance);

      res.status(201).json({ message: "Account created successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/refresh", (req, res) => {
  try {
    const refresh = req.body.refreshToken;
    if (refresh) {
      jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          console.log("err", err);
          res.status(403).json({ message: "Invalid Token" });
        } else {
          const accessToken = jwt.sign(
            { id: decoded.id, email: decoded.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
          );
          const refreshToken = jwt.sign(
            { id: decoded.id, email: decoded.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
          );
          res.status(200).json({ accessToken, refreshToken });
        }
      });
    } else res.status(400).json({ message: "No RefreshToken Provided" });
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = { router };
