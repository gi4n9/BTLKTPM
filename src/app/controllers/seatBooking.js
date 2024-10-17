const mongoose = require('mongoose');
const Film = require('./models').Film; // Import Film model

/**
 * Đặt ghế cho một bộ phim
 * @param {string} filmId - ID của bộ phim
 * @param {string} theaterId - ID của rạp chiếu
 * @param {string} showdate - Ngày chiếu
 * @param {string} showtime - Giờ chiếu
 * @param {string} roomName - Tên phòng chiếu
 * @param {string} seatNumber - Số ghế
 * @returns {Promise<Object>} - Thông tin phim đã cập nhật
 */
async function bookSeat(filmId, theaterId, showdate, showtime, roomName, seatNumber) {
    const updatedFilm = await Film.updateOne(
        {
            _id: mongoose.Types.ObjectId(filmId),
            "theaters.theater_id": theaterId,
            "theaters.showdates.date": showdate,
            "theaters.showdates.showtimes.time": showtime,
            "theaters.showdates.showtimes.room.room_name": roomName,
            "theaters.showdates.showtimes.room.seats.seat_number": seatNumber
        },
        { $set: { "theaters.$[theater].showdates.$[showdate].showtimes.$[showtime].room.$[room].seats.$[seat].status": "booked" } },
        {
            arrayFilters: [
                { "theater.theater_id": theaterId },
                { "showdate.date": showdate },
                { "showtime.time": showtime },
                { "room.room_name": roomName },
                { "seat.seat_number": seatNumber }
            ]
        }
    );

    return updatedFilm;
}

// Xuất hàm để sử dụng ở nơi khác trong dự án
module.exports = { bookSeat };
