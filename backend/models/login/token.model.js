const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, expires: 3600 },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model("token", tokenSchema);

module.exports = Token;
