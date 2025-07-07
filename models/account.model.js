const mongoose = require("mongoose");
const generate = require("../helpers/generate");

const accountSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: {
      type: String,
      default: generate.generateRandomString(20),
    },
    phone: String,
    avatar: String,
    role_id: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: Date,
  },
  { timestamps: true }
);

//- Tham số thứ 3 là tên database đã đặt tức là đi tìm connection tên prroducts và đặt tên models là Product
const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;
