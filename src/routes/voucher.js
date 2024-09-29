import express from 'express';
const route = express.Router();
import VoucherController from '../app/controllers/voucherController.js';

// Use the index method of the controller as middleware
route.get('/voucher', VoucherController.index);

export default route;
