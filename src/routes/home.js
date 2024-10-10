import express from 'express';
const route = express.Router();
import homeController from '../app/controllers/homeController.js';

// Use the index method of the controller as middleware
route.get('/home', homeController.index);

export default route;
