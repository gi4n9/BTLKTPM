import express from 'express';
const router = express.Router();
import filmsController from '../app/controllers/readController.js';

router.get('/create', filmsController.create); 

router.post('/store', filmsController.store);

router.get('/', filmsController.index); 

router.get('/:id/edit', filmsController.edit);

router.put('/:id', filmsController.update);

export default router; 
