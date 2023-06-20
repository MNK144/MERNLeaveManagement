const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 6,
    maxLength: 200,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 64,
  },
  role: {
    type: String,
    enum: ['employee', 'manager']
  },
});

module.exports = mongoose.model("User", userSchema);
