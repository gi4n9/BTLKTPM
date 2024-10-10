import express from 'express';
import path from 'path';
import cors from "cors";
import bcrypt from 'bcrypt';
import route from './routes/index.js';
import registerRoute from './routes/register.js';
import authRoute from './routes/auth.js';
import { create } from 'express-handlebars';
import { fileURLToPath } from 'url';
import { connect } from './config/db/index.js'; // Gọi connect từ db
import methodOverride from 'method-override';
import session from 'express-session';
import User from './app/models/User.js';

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
  helpers: {
    json: function (context) {
      return JSON.stringify(context);
    }
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,  // Cho phép truy cập vào các thuộc tính của prototype
    allowProtoMethodsByDefault: true,     // Cho phép truy cập vào các phương thức của prototype
  }
});

// Đăng ký helper
hbs.handlebars.registerHelper('indexPlusOne', function(index) {
  return index + 1;
});

// Cấu hình Express để phục vụ các file tĩnh từ thư mục 'public'
app.use(cors({
  origin: "*"
}));
app.use(express.static(path.join('src')));
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

app.get('/login', (req, res) => {
  res.render('login', /*data_film*/);
});

app.get('/admin', (req, res) => {
  res.render('admin/dashboard', { layout: false });
});

// Middleware kiểm tra vai trò admin
const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next(); // Cho phép truy cập nếu là admin
  }
  return res.status(403).send('Access denied. Admins only.');
};

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/home`);
});

// Hàm tạo tài khoản Admin
async function createAdminAccount() {
    const email = 'admin@gmail.com';
    const plainPassword = 'admin'; 
    const hashedPassword = await bcrypt.hash(plainPassword, 10); 

    // Kiểm tra xem tài khoản admin đã tồn tại chưa
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
        console.log('Admin account already exists.');
        return; // Nếu đã tồn tại, không cần tạo lại
    }
    
    // Nếu chưa tồn tại, tạo tài khoản admin mới
    const admin = new User({
        email: email,
        password: hashedPassword,
        username: 'AdminUser',
        contact: '0987281823',
        role: 'admin' 
    });

    await admin.save(); // Lưu admin vào database
    console.log('Admin account created successfully');
}

createAdminAccount();
