import express from 'express';
import bcrypt from 'bcrypt';
import User from '../app/models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra người dùng
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Invalid email or password');
  }

  // So sánh mật khẩu
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid email or password');
  }

  // Lưu thông tin người dùng vào session
  req.session.user = user;  // Lưu người dùng vào session
  res.redirect('/');  // Chuyển hướng tới trang chính
});

export default router;