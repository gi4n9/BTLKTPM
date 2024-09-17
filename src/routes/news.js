import express from 'express';
const route = express.Router();
import newsController from '../app/controllers/newsController.js';

// Use the index method of the controller as middleware
route.get('/', newsController.index);

export default route;
