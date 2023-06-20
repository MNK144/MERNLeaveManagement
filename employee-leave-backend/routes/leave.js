const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const LeaveBalance = require("../models/LeaveBalance");
const Leaves = require("../models/Leave");
const Leave = require("../models/Leave");
require("dotenv").config();

//Get Leave Balance
router.get("/balance", async (req, res) => {
  try {
    console.log("req", req.tokenPayload.id);
    const userID = req.tokenPayload.id;
    const leaveBalance = await LeaveBalance.findOne({ userID });
    console.log("leaveBalance", leaveBalance);
    res.status(200).json({ leaveBalance });
  } catch (e) {
    console.log("err", e);
    res.status(500).json({ message: e.message });
  }
});

//Fetch All Leaves
router.get("/", async (req, res) => {
  try {
    const userID = req.tokenPayload.id;
    const leavesData = await Leaves.find({ userID });
    res.status(200).json({ leaves: leavesData });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//Fetch One
router.get("/:id", async (req, res) => {
  try {
    console.log("Getting Leave", req.params.id);
    const leaveData = await Leaves.findById(req.params.id);
    res.status(200).json({ leave: leaveData });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("Creating Leave", req.body);
    const userID = req.tokenPayload.id;
    const { leaveType, startDate, endDate } = req.body;

    const totalDays =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;
    console.log("total Days", totalDays);
    if (totalDays < 1) {
      return res.status(401).json({ message: "Enter Dates Correctly" });
    }
    const leaveBalance = await LeaveBalance.findOne({ userID });
    console.log("leaveBalance", leaveBalance);
    if (
      (leaveType === "casual" && leaveBalance.casualLeaves < totalDays) ||
      (leaveType === "sick" && leaveBalance.sickLeaves < totalDays)
    ) {
      return res
        .status(403)
        .json({ message: "You do not have enough Leave Balance" });
    }
    const casualLeaves =
      leaveType === "casual"
        ? leaveBalance.casualLeaves - totalDays
        : leaveBalance.casualLeaves;
    const sickLeaves =
      leaveType === "sick"
        ? leaveBalance.sickLeaves - totalDays
        : leaveBalance.sickLeaves;
    console.log("casualLeaves", casualLeaves);
    console.log("sickLeaves", sickLeaves);
    await LeaveBalance.findOneAndUpdate(
      { _id: leaveBalance._id },
      { casualLeaves, sickLeaves }
    );
    const leaveData = await Leaves.create({
      leaveType,
      startDate,
      endDate,
      totalLeaves: totalDays,
      isApproved: false,
      userID,
    });
    console.log("leaveData", leaveData);
    res
      .status(200)
      .json({ message: "Leave Created Successfully", leave: leaveData });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

// router.put("/", async (req, res) => {
//     try {
//         const leave = await Leaves.findOneAndUpdate(
//           { _id: req.body.id },
//           { ...req.body.payload },
//           { runValidators: true, new: true }
//         );
//         console.log("leave", leave);
//       } catch (e) {
//         console.log(e);
//         res.status(500).json({ message: e.message });
//       }
// });

router.delete("/", async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) return res.status(400).json({ message: "ID is Required" });
    const userID = req.tokenPayload.id;
    const leaveData = await Leaves.findById(id);
    if (leaveData.userID.toString() !== userID) {
      return res.status(401).json({ message: "Access Denied" });
    }
    const delres = await Leaves.findByIdAndDelete(id);
    console.log("delres", delres);
    const leaveBalance = await LeaveBalance.findOne({ userID });
    console.log("lb", leaveBalance);
    const casualLeaves =
      leaveData.leaveType === "casual"
        ? leaveBalance.casualLeaves + leaveData.totalLeaves
        : leaveBalance.casualLeaves;
    const sickLeaves =
      leaveData.leaveType === "sick"
        ? leaveBalance.sickLeaves + leaveData.totalLeaves
        : leaveBalance.sickLeaves;
    await LeaveBalance.findOneAndUpdate(
      { _id: leaveBalance._id },
      { casualLeaves, sickLeaves }
    );
    res.status(200).json({ message: "Leave deleted Successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

router.put("/approve", async (req, res) => {
  try {
    const userID = req.tokenPayload.id;
    const id = req.body.id;
    if(!id) return res.status(400).json({message: "ID is Required"});
    const user = await Users.findById(userID);
    console.log("user", user);
    console.log("user role", user.role);
    if (user.role === "manager") {
      const leave = await Leaves.findOneAndUpdate(
        { _id: req.body.id },
        { isApproved: true }
      );
      console.log("Leave", leave);
      res.status(200).json({ message: "Leave Approved Successfully" });
    } else res.status(403).json({ message: "You do not have permission" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = { router };
