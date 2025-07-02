require("dotenv").config();
const express = require("express");
// ghi đè để dùng phương thức như patch khai báo method-override
const methodOverride = require("method-override");
// conver data để req.body trong node có thể đọc dữ liệu của body
const bodyParser = require("body-parser");
// flass để thông báo
const flash = require("express-flash");

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

// khai báo để các trong folder public có thể public được
app.use(express.static(`${__dirname}/public`));

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// truyền app vào
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
