const mongoose = require("mongoose");

const { Schema } = mongoose;

const User = new Schema(
  {
    userName: { type: String },
    userEmail: { type: String, required: true, unique: true, trim: true },
    userPassword: { type: String, required: true },
    authToken: { type: String, required: true, default: null },
    isAuthenticated: { type: Boolean, required: true, default: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    modelID: { type: String, required: true },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
