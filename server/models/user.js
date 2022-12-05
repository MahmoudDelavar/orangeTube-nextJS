const mongoose = require("mongoose");
const timeStamp = require("mongoose-timestamp");
//===================================
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true },
  avatarPath: { type: String },
});

userSchema.plugin(timeStamp);

module.exports = mongoose.model("User", userSchema);
