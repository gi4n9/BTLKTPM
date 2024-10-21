import Booking from '../models/Booking.js';
import Film from '../models/Film.js'; // Import Film model

class BookingController {
    // [POST] /booking
    async store(req, res) {
        try {
            const { filmTitle, theaterId, date, time, roomName, seats } = req.body;
            console.log( `${filmTitle}, ${theaterId}, ${date}, ${time}, ${roomName}, ${seats}`);

            // Kiểm tra xem các trường có hợp lệ không
            if (!filmTitle || !theaterId || !date || !time || !roomName || !seats || seats.length === 0) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // Tìm filmId từ Film collection dựa vào filmTitle
            const film = await Film.findOne({ title: filmTitle });
            if (!film) {
                return res.status(404).json({ message: 'Film not found' });
            }

            const booking = new Booking({
                filmId: film._id, // Sử dụng ObjectId của phim
                theaterId,
                date,
                time,
                roomName,
                seats
            });

            await booking.save();
            return res.status(200).json({ message: 'Booking successful' });
        } catch (error) {
            console.error('Booking validation error:', error);
            return res.status(500).json({ message: 'Booking validation failed', error: error.message });
        }
    }
}

export default new BookingController();
