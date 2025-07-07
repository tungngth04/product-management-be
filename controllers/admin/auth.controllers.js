const Account = require("../../models/account.model");
const md5 = require("md5");
const systemConfig = require("../../config/system");

// [GET] /admin/auth/login
module.exports.login = (req, res) => {
  if (req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
  } else {
    res.render("admin/pages/auth/login", {
      pageTitle: "Đăng nhâp",
    });
  }
};

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Kiểm tra tài khoản
  const user = await Account.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    req.flash("error", "Email không tồn tại");
    return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }

  if (md5(password) !== user.password) {
    req.flash("error", "Mật khẩu không đúng");
    return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }

  if (user.status == "inactive") {
    req.flash("error", "Tài khoản đã bị khóa");
    return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }

  res.cookie("token", user.token);
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};

// [GET] /admin/auth/logout
module.exports.logout = (req, res) => {
  res.clearCookie("token");
  req.flash("success", "Đăng xuất thành công");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};
