import mongoose from 'mongoose';
import slugify from 'slugify';

const seatSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    gia: { type: Number },
    type: { type: String }
});

const timeSchema = new mongoose.Schema({
    id: { type: String },
    time: { type: String },
    ten_phong: { type: String },
    ghe: [seatSchema]
});

const ngayChieuSchema = new mongoose.Schema({
    id: { type: String },
    ngay: { type: String },
    thu: { type: String },
    gio_chieu: [timeSchema]
});

// Định nghĩa Film Schema
const FilmSchema = new mongoose.Schema({
    // id: { type: Number, unique: true }, // Tự động tăng ID
    title: { type: String, required: true },
    note: { type: String },
    dao_dien: { type: String },
    dien_vien: { type: String },
    the_loai: { type: String },
    khoi_chieu: { type: Date },
    thoi_luong: { type: String },
    ngon_ngu: { type: String },
    src: { type: String },
    ngay_chieu: [ngayChieuSchema]
}, {
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

