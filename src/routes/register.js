import express from 'express';
import bcrypt from 'bcrypt';
import User from '../app/models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username, email, password, contact } = req.body;

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới và lưu vào cơ sở dữ liệu
    const newUser = new User({
      username,    // Lưu username
      email,       // Lưu email
      password: hashedPassword,  // Lưu mật khẩu đã hash
      contact,     // Lưu số điện thoại
    });
    await newUser.save();

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

export default router;
