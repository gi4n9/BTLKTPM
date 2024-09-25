// routes/admin.js
import express from 'express';
const router = express.Router();

// Route trang Admin Dashboard
router.get('/dashboard', (req, res) => {
  res.render('admin/dashboard', { title: 'Admin Dashboard' });  // Render trang admin dashboard
});

export default router;
