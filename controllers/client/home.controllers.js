//- controller nhận request từ client và trả về response để render view
// [GET] /
module.exports.index = (req, res) => {
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
  });
};
