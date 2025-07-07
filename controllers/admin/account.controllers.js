const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");
// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  // - là lấy tất cả cá trường trừ trường có dấu -
  const records = await Account.find(find).select("-password -token");

  for (const record of records) {
    const role = await Role.findOne({ deleted: false, _id: record.role_id });
    record.role = role;
  }
  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
};

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({ deleted: false });
  res.render("admin/pages/accounts/create", {
    pageTitle: "Tạo tài khoản",
    roles: roles,
  });
};

// [POST] /admin/accounts/createPost
module.exports.createPost = async (req, res) => {
  const emailExists = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (emailExists) {
    req.flash("error", "Email đã tồn tại");

    res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
  } else {
    req.body.password = md5(req.body.password);
    const record = new Account(req.body);
    // Xử lý file upload nếu có
    if (req.file) {
      record.avatar = req.file.path;
    }
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Account.findOne({ _id: id, deleted: false });
    const roles = await Role.find({ deleted: false });
    res.render("admin/pages/accounts/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      data: data,
      roles: roles,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
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
  res.redirect(`${systemConfig.prefixAdmin}/accounts`);
};
