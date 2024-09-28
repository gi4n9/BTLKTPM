import express from 'express';
const route = express.Router();
import TheaterController from '../app/controllers/theaterController.js';

// Use the index method of the controller as middleware
route.get('/theater', TheaterController.index);

export default route;
