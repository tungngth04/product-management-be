const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: Boolean,
});

//- Tham số thứ 3 là tên database đã đặt tức là đi tìm connection tên prroducts và đặt tên models là Product
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
