// Route sử dụng để xử lý đăng nhập, xác thực tài khoản
import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt' //package sử dụng để hash mật khẩu

const router = express.Router();

// Route xử lý đăng ký
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Hash mật khẩu trước khi lưu
      const hashedPassword = await bcrypt.hash(password, 10); // Số "10" là số vòng băm (salt rounds)
  
      // Tạo người dùng mới và lưu vào cơ sở dữ liệu
      const newUser = new User({
        email,
        password: hashedPassword,  // Lưu mật khẩu đã được mã hóa
      });
  
      await newUser.save();
      res.status(201).send('User registered successfully');
    } catch (error) {
      res.status(500).send('Error registering user');
    }
  });
  
// Route xử lí đăng nhập
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('User not found');
        }
        
        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).send('Invalid password');
        }

        // Phân luồng theo vai trò
        if (user.role === 'admin') {
            // Điều hướng đến trang chủ admin
            return res.redirect('/admin/dashboard');
        } else {
            // Điều hướng đến trang dành cho người dùng
            return res.redirect('/user/dashboard');
        }
    } catch (error) {
        return res.status(500).send('Server error');
    }
});

export default router;