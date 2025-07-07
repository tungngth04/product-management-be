const md5 = require("md5");
const Account = require("../../models/account.model");

// [GET] /admin/my-account
module.exports.index = (req, res) => {
  res.render("admin/pages/my-account/index", {
    title: "Thông tin tài khoản",
  });
};

// [GET] /admin/my-account/edit
module.exports.edit = (req, res) => {
  res.render("admin/pages/my-account/edit", {
    title: "Chỉnh sửa thông tin tài khoản",
  });
};
// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
  const id = res.locals.user.id;
  const emailExists = await Account.findOne({
    email: req.body.email,
    deleted: false,
    _id: { $ne: id }, // Đảm bảo không kiểm tra chính nó
  });
  if (emailExists) {
    req.flash("error", "Email đã tồn tại");
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password; // Xóa trường password nếu không có giá trị
    }
    await Account.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật tài khoản thành công");
  }
  res.redirect("back");
};
