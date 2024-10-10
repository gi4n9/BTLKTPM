import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

const SeatSchema = new mongoose.Schema({
    seat_number: { type: String },
    status: { type: String }, // 'available', 'booked'
    price: { type: Number }
});

const RoomSchema = new mongoose.Schema({
    room_id: { type: String },
    room_name: { type: String },
    seats: [SeatSchema]
});

const ShowtimeSchema = new mongoose.Schema({
    time: { type: String },
    room: [RoomSchema]
});

const ShowdateSchema = new mongoose.Schema({
    date: { type: String },
    showtimes: [ShowtimeSchema]
})

const TheaterSchema = new mongoose.Schema({
    theater_id: { type: String },
    theater_name: { type: String },
    src_theater: { type:String },
    address: { type: String },
    showdates: [ShowdateSchema]
})

const FilmSchema = new mongoose.Schema({
    id: { type: String },
    title: { type: String, required: true },
    note: { type: String },
    dao_dien: { type: String },
    dien_vien: { type: String },
    the_loai: { type: String },
    khoi_chieu: { type: Date },
    thoi_luong: { type: String },
    ngon_ngu: { type: String },
    src_phim: { type: String },
    type: { type: String },
    theaters: [TheaterSchema]
}, 
{
    timestamps: true,
});


FilmSchema.pre('save', function(next) {
    if (this.title && !this.slug) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});


// Tạo model Film
const Film = mongoose.model('Film', FilmSchema);

export default Film;

