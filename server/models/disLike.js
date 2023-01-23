const mongoose = require("mongoose");
const timeStamp = require("mongoose-timestamp");
//===================================

const disLikeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
});
disLikeSchema.plugin(timeStamp);

module.exports = mongoose.model("DisLike", disLikeSchema);
