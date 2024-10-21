import express from 'express';
import authMiddleware from '../app/middleware/authMiddle.js'; // Import middleware xác thực
import Booking from '../app/models/Booking.js'; // Giả sử bạn có model Booking để lưu thông tin vé

const router = express.Router();

// Route đặt vé (chỉ cho phép truy cập khi đã xác thực)
router.post('/booking', authMiddleware, async (req, res) => {
    const { filmTitle, theaterId, date, time, roomName, seats } = req.body;

    try {
        // Tạo một bản ghi đặt vé mới
        const newBooking = new Booking({
            userId: req.user.id, // Lấy userId từ token đã xác thực
            filmTitle,
            theaterId,
            date,
            time,
            roomName,
            seats
        });

        // Lưu vào database
        await newBooking.save();

        res.json({ message: 'Booking successful' });
    } catch (error) {
        console.error('Error during booking:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
