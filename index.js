require("dotenv").config();
const express = require("express");
const path = require("path");
// ghi đè để dùng phương thức như patch khai báo method-override
const methodOverride = require("method-override");
// conver data để req.body trong node có thể đọc dữ liệu của body
const bodyParser = require("body-parser");
// flass để thông báo
const flash = require("express-flash");
// moment xử lý thời gian
const moment = require("moment");

const cookieParser = require("cookie-parser");
const session = require("express-session");

// nhúng các route vào
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

const database = require("./config/database");

const systemConfig = require("./config/system");

database.connect();

const app = express();
const port = process.env.PORT;

// override (ghi đè) with POST having ?_method=DELETE dùng ghi sau app
app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// khai báo dùng pug
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// Khởi tạo flash
app.use(cookieParser("keyboard cat")); // key ở đây để bảo mật tự tạo ra
app.use(session({ cookie: { maxAge: 60000 } })); // thời gian tồn tại
app.use(flash());

// khai báo tynimce
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// khai báo để các trong folder public có thể public được
app.use(express.static(`${__dirname}/public`));

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// app local moment
app.locals.moment = moment;

// truyền app vào
route(app);
routeAdmin(app);

// trang 404
app.get("*", (req, res) => {
  res.render("client/pages/errors/404", {
    pageTitle: "404 Not Found",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
