import express from 'express';
import path from 'path';
import cors from "cors";

import { create } from 'express-handlebars';
import { fileURLToPath } from 'url';
import route from './routes/index.js';
import { connect } from './config/db/index.js'; // Gọi connect từ db
import collection from "./config/db/config.js";

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

// Create an instance of handlebars with `create()`
const hbs = create({
  extname: '.handlebars',
});

// Cấu hình Express để phục vụ các file tĩnh từ thư mục 'public'
app.use(express.static(path.join('public')));

app.use(cors({
  origin: "*"
}));

app.use(express.static(path.join('src')));

// Set up handlebars as the template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname) + '\\resources\\views');
console.log('Path:', path.join(__dirname) + '\\resources\\views')

// route init
route(app);

// static file
app.use(express.static("public"));

// Route cho trang chủ trả về trang đăng nhập
app.get('/', (req, res) => {
  res.render('login', { layout: false });
});

app.get('/register', (req, res) => {
  res.render('register', { layout: false });
});

app.get('/theater', (req, res) => {
  // logic lay data tu db len => data
  res.render('theater', /*data_film*/); 
});

app.get('/voucher', (req, res) => {
  // logic lay data tu db len => data
  res.render('voucher', /*data_film*/); // Ensure 'home.handlebars' exists in your views folder
});

app.get("/api-test", (req, res) => {
  res.json({
    mess: "",
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Xử lý lỗi kết nối database
connect().catch(err => console.error('Failed to connect to database:', err));