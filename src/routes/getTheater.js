import express from 'express';
const router = express.Router();
import getTheaterController from '../app/controllers/getTheaterController.js';

router.get('/films/:filmId/theaters', getTheaterController.getTheaters); 

router.get('/films/:filmId/theaters/:theaterID/dates/:date/showtimes/:time/seats', getTheaterController.getSeats);

export default router; 
