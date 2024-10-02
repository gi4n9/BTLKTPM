import express from 'express';
const route = express.Router();
import SaleController from '../app/controllers/saleController.js';

// Use the index method of the controller as middleware
route.get('/sale', SaleController.index);

export default route;
