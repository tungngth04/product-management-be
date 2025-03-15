const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/product.controllers");
router.get("/", controller.index);

module.exports = router;
