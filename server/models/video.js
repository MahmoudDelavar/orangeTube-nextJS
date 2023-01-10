const mongoose = require("mongoose");
const timeStamp = require("mongoose-timestamp");
//===================================

const videoSchema = new mongoose.Schema({
  writer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  description: { type: String },
  Path: { type: String },
  category: { type: String },
  wiews: { type: Number },
  duration: { type: Number },
  thumbnail: { type: String },
});
videoSchema.plugin(timeStamp);

module.exports = mongoose.model("Video", videoSchema);
