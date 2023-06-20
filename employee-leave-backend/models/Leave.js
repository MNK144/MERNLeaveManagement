const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  leaveType:{
    type: String,
    required: true,
    enum: ['casual', 'sick', 'emergency'] 
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalLeaves: {
    type: Number,
    required: true,
    minLength: 1,
    maxLength: 365,
  },
  isApproved: {
    type: Boolean,
    required: true,
    default: false,
  },
  userID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User"
  },
});

module.exports = mongoose.model("Leave", leaveSchema);