const mongoose = require("mongoose");

const { Schema } = mongoose;

const Post = new Schema({
  created: { type: Date },
  title: String,
  description: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  // relation Post belongs_to User
});

module.exports = mongoose.model("Post", Post);
