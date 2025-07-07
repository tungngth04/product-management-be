//- controller nhận request từ client và trả về response để render view
const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");

// [GET] /
module.exports.index = async (req, res) => {
  // lấy ra sản phẩm nôi bật
  const productsFeatured = await Product.find({
    featured: "1",
    status: "active",
    deleted: false,
  }).limit(6);
  const newProductsFeatured = productsHelper.priceNewProducts(productsFeatured);

  // hiện thị sản phẩm mới nhất
  const productNew = await Product.find({
    status: "active",
    deleted: false,
  })
    .sort({ position: "desc" })
    .limit(6);

  const newProductsNew = productsHelper.priceNewProducts(productNew);
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productsFeatured: newProductsFeatured,
    productsNew: newProductsNew,
  });
};
