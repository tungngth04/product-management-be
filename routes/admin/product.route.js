const express = require("express");
const router = express.Router();
// upload file
const multer = require("multer");
// import storage định nghĩa bên kia qua để có thể sử dụng dùng bằng multer
// const storageMulter = require("../../helpers/storageMulter");
// const upload = multer({ storage: storageMulter() }); // dest đường dẫn lưu (vị trí lưu)

// dùng bằng cloudinary
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares");
const controller = require("../../controllers/admin/product.controllers");

const validate = require("../../validates/admin/product.validate");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
);

router.get("/detail/:id", controller.detail);

module.exports = router;
