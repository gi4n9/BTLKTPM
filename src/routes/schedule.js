import express from 'express';
import ScheduleController from '../app/controllers/scheduleController.js';

const router = express.Router();

// [GET] /films/:id/schedule
router.get('/:id/schedule', ScheduleController.getSchedule);

// [GET] /films/:id/schedule/:ngay_chieu
router.get('/:id/schedule/:ngay_chieu', ScheduleController.getShowtimes);

// [GET] /films/:id/schedule/:ngay_chieu/:gio_chieu
router.get('/:id/schedule/:ngay_chieu/:gio_chieu', ScheduleController.getSeats);

// [POST] /films/:id/book
router.post('/:id/book', ScheduleController.bookSeat);

export default router;
