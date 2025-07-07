// tách các file ra để dễ kiểm soát vì nếu viết hêt routes trong index.js thì sẽ rất khó quản lý
const express = require("express");

// exoress.Router() là một hàm tạo ra một đối tượng router mới
// đối tượng này có thể được sử dụng để định nghĩa các route cho ứng dụng Express thay vì truyền biến app vào trực tiếp
const router = express.Router();

const controller = require("../../controllers/client/product.controllers");

router.get("/", controller.index);

router.get("/:slugCategory", controller.category);

router.get("/detail/:slugProduct", controller.detail);

// export để có thể dùng
module.exports = router;
