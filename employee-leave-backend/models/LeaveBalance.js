const mongoose = require("mongoose");

const leaveBalanceSchema = new mongoose.Schema({
  casualLeaves: {
    type: Number,
    required: true,
    minLength: 1,
    maxLength: 365,
  },
  sickLeaves: {
    type: Number,
    required: true,
    minLength: 1,
    maxLength: 365,
  },
  userID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User"
  },
});

module.exports = mongoose.model("LeaveBalance", leaveBalanceSchema);