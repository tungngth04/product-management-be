const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");

// export để dùng giống bên reactjs 
// truyền biến app vào để sử dụng các phương thức của express bên index chung 
module.exports = (app) => {
  app.use("/", homeRoutes);

  // vì bên file router đã có get rồi nên k cần dùng get vì k cần thiết nên dùng use là sử dụng routes này
  app.use("/products", productRoutes);
};
