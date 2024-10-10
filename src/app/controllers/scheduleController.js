import Film from '../models/Film.js';

class ScheduleController {
    // [GET] /films/:id/schedule
    async getSchedule(req, res, next) {
        try {
            const film = await Film.findById(req.params.id);
            res.render('films/schedule', {
                film: film.toObject()
            });
        } catch (error) {
            next(error);
        }
    }

    // [GET] /films/:id/schedule/:ngay_chieu
    async getShowtimes(req, res, next) {
        try {
            const film = await Film.findById(req.params.id);
            const ngayChieu = film.ngay_chieu.find(n => n.id === req.params.ngay_chieu);
            res.json(ngayChieu.gio_chieu);
        } catch (error) {
            next(error);
        }
    }

    // [GET] /films/:id/schedule/:ngay_chieu/:gio_chieu
    async getSeats(req, res, next) {
        try {
            const film = await Film.findById(req.params.id);
            const ngayChieu = film.ngay_chieu.find(n => n.id === req.params.ngay_chieu);
            const gioChieu = ngayChieu.gio_chieu.find(g => g.id === req.params.gio_chieu);
            res.json(gioChieu.ghe);
        } catch (error) {
            next(error);
        }
    }

    // [POST] /films/:id/schedule/:ngay_chieu/add-seat
    async addSeat(req, res, next) {
        try {
            const film = await Film.findById(req.params.id);
            const { ngayChieuId, name, gia, type } = req.body; // Lấy thông tin ghế từ request body

            // Tìm ngày chiếu tương ứng
            const ngayChieu = film.ngay_chieu.find(n => n.id === ngayChieuId);

            // Thêm ghế mới vào giờ chiếu
            const gioChieu = ngayChieu.gio_chieu[0]; // Giả sử thêm vào giờ chiếu đầu tiên (cần điều chỉnh nếu có nhiều giờ chiếu)
            gioChieu.ghe.push({ name, gia, type });

            await film.save();
            res.status(201).json({ message: 'Ghế đã được thêm thành công!' });
        } catch (error) {
            next(error);
        }
    }

    // [DELETE] /films/:id/schedule/:ngay_chieu/delete-seat
    async deleteSeat(req, res, next) {
        try {
            const film = await Film.findById(req.params.id);
            const { ngayChieuId, seatName } = req.body; // Lấy tên ghế từ request body

            // Tìm ngày chiếu tương ứng
            const ngayChieu = film.ngay_chieu.find(n => n.id === ngayChieuId);

            // Xóa ghế theo tên
            const gioChieu = ngayChieu.gio_chieu[0]; // Giả sử xóa ghế từ giờ chiếu đầu tiên
            gioChieu.ghe = gioChieu.ghe.filter(seat => seat.name !== seatName);

            await film.save();
            res.status(200).json({ message: 'Ghế đã được xóa thành công!' });
        } catch (error) {
            next(error);
        }
    }

    // [POST] /films/:id/book
    async bookSeat(req, res, next) {
        const { filmId } = req.body; // Chỉ giữ lại filmId nếu không cần các biến khác

        // Lưu thông tin thanh toán vào database nếu cần
        try {
            // Logic lưu vào database
            res.redirect(`/films/${filmId}`); // Hoặc redirect tới trang thành công
        } catch (error) {
            next(error);
        }
    }
}

export default new ScheduleController();
