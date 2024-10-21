import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    filmTitle: { type: String, required: true },
    theaterId: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    roomName: { type: String, required: true },
    seats: [{ type: String, required: true }],
    userName: { type: String, required: true },
    userPhone: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Liên kết tới người dùng
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
