const Product = require("../../models/product.model");
// [GET] /admin/products
module.exports.index = async (req, res) => {
  let filterStatus = [
    { name: "Tất cả", status: "", class: "" },

    { name: "Hoạt động", status: "active", class: "" },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  if (req.query.status) {
    const index = filterStatus.findIndex(
      (item) => item.status == req.query.status
    );
    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex((item) => item.status == "");
    filterStatus[index].class = "active";
  }
  // Lấy query
  // console.log(req.query.status);
  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  const products = await Product.find(find);

  console.log(products);
  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
  });
};
