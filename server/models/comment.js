const mongoose = require("mongoose");
const timeStamp = require("mongoose-timestamp");
//===================================
const commentSchema = new mongoose.Schema({
  writer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
  responseTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String },
});

commentSchema.plugin(timeStamp);

module.exports = mongoose.model("Comment", commentSchema);
