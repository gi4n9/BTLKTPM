import express from 'express';
import User from '../app/models/User.js';

const router = express.Router();

router.post('/films/:filmId/theaters/:theaterId/dates/:date/showtimes/:time/seats', async (req, res) => {
    const { filmId, theaterId, date, time } = req.params;
    const { seats } = req.body; // Mảng số ghế
    const user = req.session.user;

    if (!user) {
        return res.status(401).json({ success: false, message: 'Người dùng chưa đăng nhập' });
    }

    try {
        // Tìm người dùng trong cơ sở dữ liệu
        const userData = await User.findOne({ email: user.email });

        if (!userData) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
        }

        // Tạo vé mới
        const newTicket = {
            filmId,
            theaterId,
            date,
            time,
            seats
        };

        // Thêm vé vào danh sách `tickets` của người dùng
        userData.tickets.push(newTicket);
        await userData.save(); // Lưu thay đổi vào cơ sở dữ liệu

        res.json({ success: true, message: 'Thanh toán thành công và vé đã được lưu' });
    } catch (error) {
        console.error('Error during payment:', error);
        res.status(500).json({ success: false, message: 'Có lỗi xảy ra trong quá trình thanh toán.' });
    }
});

export default router;