import express from 'express';
const router = express.Router(); // Đổi từ route thành router
import meController from '../app/controllers/MeController.js';

router.get('/stored/films', meController.storedFilms); 


export default router; 
