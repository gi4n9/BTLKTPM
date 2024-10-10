import express from 'express';
const route = express.Router();
import showtimeController from '../app/controllers/showtimeController.js';

// Use the index method of the controller as middleware
route.get('/showtimes', showtimeController.index);

export default route;
