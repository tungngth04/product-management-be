const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");
const searchtRoutes = require("./search.route");
const cartRoutes = require("./cart.route");
const checkoutRoutes = require("./checkout.route");
const userRoutes = require("./user.route");

const categoryMiddleware = require("../../middlewares/client/category.middlewares");
const cartyMiddleware = require("../../middlewares/client/cart.middlewares");
const userMiddleware = require("../../middlewares/client/user.middlewares");
const settingGeneralMiddleware = require("../../middlewares/client/setting.middleware");

// export để dùng giống bên reactjs
// truyền biến app vào để sử dụng các phương thức của express bên index chung
module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use(cartyMiddleware.cartId);
  app.use(userMiddleware.infoUser);
  app.use(settingGeneralMiddleware.settingGeneral);

  app.use("/", homeRoutes);

  // vì bên file router đã có get rồi nên k cần dùng get vì k cần thiết nên dùng use là sử dụng routes này
  app.use("/products", productRoutes);

  app.use("/search", searchtRoutes);

  app.use("/cart", cartRoutes);

  app.use("/checkout", checkoutRoutes);

  app.use("/user", userRoutes);
};
