import jwt from 'jsonwebtoken';

// Middleware xác thực token
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header Authorization

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Kiểm tra token với secret key
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Lưu thông tin người dùng đã xác thực vào req
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };
        next(); // Chuyển sang route handler tiếp theo
    });
};

export default authMiddleware;
