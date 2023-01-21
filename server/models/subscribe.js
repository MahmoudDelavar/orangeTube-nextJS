const mongoose = require("mongoose");
const timeStamp = require("mongoose-timestamp");
//===================================
const subscribeSchema = new mongoose.Schema({
  userFrom: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

subscribeSchema.plugin(timeStamp);

module.exports = mongoose.model("Subscribe", subscribeSchema);
