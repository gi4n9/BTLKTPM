import express from 'express';
import path from 'path';
import cors from "cors";
import route from './routes/index.js';
import registerRoute from './routes/register.js';
import authRoute from './routes/auth.js';
import { create } from 'express-handlebars';
import { fileURLToPath } from 'url';
import { connect } from './config/db/index.js'; // Gọi connect từ db
import methodOverride from 'method-override';
import session from 'express-session';

// Kết nối tới database
connect().then(() => {
  console.log("Database connected successfully");
}).catch((err) => {
  console.error('Failed to connect to database:', err);
});

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

// Cấu hình session
app.use(session({
  secret: 'your-secret-key', // Chuỗi bí mật để mã hóa session
  resave: false, // Không lưu lại session nếu không thay đổi
  saveUninitialized: true, // Lưu session ngay cả khi nó chưa được khởi tạo
  cookie: { secure: false } // Chỉ sử dụng secure: true nếu trang của bạn chạy trên HTTPS
}));

// Middleware để phân tích cú pháp dữ liệu form
app.use(express.urlencoded({ extended: true }));

// Middleware để phân tích cú pháp JSON
app.use(express.json());

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Create an instance of handlebars with `create()`
const hbs = create({
  extname: '.handlebars',
});

// Đăng ký helper
hbs.handlebars.registerHelper('indexPlusOne', function(index) {
  return index + 1;
});

// Cấu hình Express để phục vụ các file tĩnh từ thư mục 'public'
app.use(cors({
  origin: "*"
}));

// Set up handlebars as the template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

// route init
route(app);

// static file
app.use(express.static(path.join(__dirname, 'public')));

// Route trang đăng nhập
app.get('/', (req, res) => {
  res.render('login', { layout: false });
});
app.use('/', authRoute);

// Router Đăng kí tài khoản
app.use('/register', registerRoute);
app.get('/register', (req, res) => {
  res.render('register', { layout: false });
});

app.get('/showtimes', (req, res) => {
  res.render('showtime', /*data_film*/);
});

app.get("/api-test", (req, res) => {
  res.json({
    mess: "",
  });
});

app.get('/admin', (req, res) => {
  res.render('admin/dashboard', { layout: false });
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/home`);
});
