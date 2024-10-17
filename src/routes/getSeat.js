import express from 'express';
const router = express.Router();
import getTheaterController from '../app/controllers/getTheaterController.js';


router.get('/films/:filmId/theaters/:theaterId/dates/:date/showtimes/:time/seats', getTheaterController.getSeats);

export default router; 
