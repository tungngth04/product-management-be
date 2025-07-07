const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema(
  {
    title: String,
    parent_id: {
      type: String,
      default: "",
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    slug: { type: String, slug: "title", unique: true },
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: Date,
  },
  { timestamps: true }
);

//- Tham số thứ 3 là tên database đã đặt tức là đi tìm connection tên prroducts và đặt tên models là Product
const productCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema,
  "products-category"
);

module.exports = productCategory;
