const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    card_id: String,
    userInfo: {
      fullName: String,
      address: String,
      phone: String,
    },
    products: [
      {
        product_id: String,
        quantity: Number,
        price: Number,
        discountPercentage: Number,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: Date,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;
