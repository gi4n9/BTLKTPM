const mongoose = require('mongoose');
const Film = require('./models').Film; // Import Film model

async function getTicketStatistics(filmId) {
    const film = await Film.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(filmId) } },
        { $unwind: "$theaters" },
        { $unwind: "$theaters.showdates" },
        { $unwind: "$theaters.showdates.showtimes" },
        { $unwind: "$theaters.showdates.showtimes.room" },
        { $unwind: "$theaters.showdates.showtimes.room.seats" },
        {
            $group: {
                _id: "$_id",
                totalSold: { $sum: { $cond: [{ $eq: ["$theaters.showdates.showtimes.room.seats.status", "booked"] }, 1, 0] } },
                totalRevenue: { $sum: { $cond: [{ $eq: ["$theaters.showdates.showtimes.room.seats.status", "booked"] }, "$theaters.showdates.showtimes.room.seats.price", 0] } },
                totalAvailable: { $sum: { $cond: [{ $eq: ["$theaters.showdates.showtimes.room.seats.status", "available"] }, 1, 0] } }
            }
        }
    ]);

    return film;
}

// Sử dụng hàm để lấy thông tin thống kê
getTicketStatistics('film_id_here').then(console.log).catch(console.error);
