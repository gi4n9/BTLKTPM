// middleware/auth.js
export const isAdmin = (req, res, next) => {
    // Kiểm tra xem người dùng đã đăng nhập và có vai trò admin
    if (req.session.user && req.session.user.role === 'admin') {
      return next();  // Cho phép truy cập
    }
    return res.status(403).send('Access denied. Admins only.');
  };
  