import express from 'express';
import bcrypt from 'bcrypt';
import User from '../app/models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
        
        // Lưu thông tin người dùng vào session
        req.session.user = {
            email: user.email,
            username: user.username,
            role: user.role
        };     
    
        if (user.role === 'admin') {
            return res.redirect('/admin/dashboard'); // Chuyển hướng đến trang admin dashboard
        } else {
            return res.redirect('/home'); // Chuyển hướng đến trang người dùng
        }

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;

