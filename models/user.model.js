const mongoose = require("mongoose");
const generate = require("../helpers/generate");

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    tokenUser: {
      type: String,
      default: generate.generateRandomString(20),
    },
    phone: String,
    avatar: String,
    status: {
      type: String,
      default: "active",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: Date,
  },
  { timestamps: true }
);

//- Tham số thứ 3 là tên database đã đặt tức là đi tìm connection tên prroducts và đặt tên models là Product
const User = mongoose.model("User", userSchema, "users");

module.exports = User;
