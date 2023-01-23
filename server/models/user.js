const mongoose = require("mongoose");
const timeStamp = require("mongoose-timestamp");
//===================================
const userSchema = new mongoose.Schema({
  userName: { type: String },
  password: { type: String },
  email: { type: String, unique: true },
  avatarPath: { type: String },
});

userSchema.plugin(timeStamp);

module.exports = mongoose.model("User", userSchema);
