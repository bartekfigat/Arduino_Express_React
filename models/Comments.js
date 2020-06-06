const mongoose = require("mongoose");

const { Schema } = mongoose;

const Comments = new Schema({
  created: { type: Date },
  description: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  // relation Post belongs_to User
});

module.exports = mongoose.model("Comments", Comments);
