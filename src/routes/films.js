import express from 'express';
const router = express.Router(); // Đổi từ route thành router
import filmsController from '../app/controllers/readController.js';

// Route cho trang tạo phim
router.get('/create', filmsController.create); // Gọi hàm create từ controller

// Route cho việc lưu phim
router.post('/store', filmsController.store); // Gọi hàm store từ controller

// Route cho trang danh sách phim
router.get('/', filmsController.index); // Route cho danh sách phim

export default router; // Xuất router
