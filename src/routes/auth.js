import express from 'express';
import bcrypt from 'bcrypt';
import User from '../app/models/User.js';

const router = express.Router();

// Route xử lý đăng nhập
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng trong cơ sở dữ liệu theo email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).send('Invalid email or password');
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log('Password mismatch for user:', user.email);
        return res.status(400).send('Invalid email or password');
    }
    
    // Nếu không có lỗi, chuyển hướng người dùng đến trang home sau khi đăng nhập thành công
    res.redirect('/home'); 
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Server error'); 
  }
});

export default router;
