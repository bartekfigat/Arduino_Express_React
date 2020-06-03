const mongoose = require("mongoose");

const { Schema } = mongoose;

const Post = new Schema({
  title: String,
  description: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  // relation Post belongs_to User
});

module.exports = mongoose.model("Post", Post);
