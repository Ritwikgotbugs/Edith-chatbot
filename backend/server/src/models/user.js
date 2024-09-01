const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: [String],
    required: true,
    default: ["Junior Developer"],
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
