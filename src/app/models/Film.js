import mongoose from 'mongoose';
import slugify from 'slugify';

const FilmSchema = new mongoose.Schema({
    title: { type: String, required: true },
    note: { type: String },
    dao_dien: { type: String },
    dien_vien: { type: String },
    the_loai: { type: String },
    khoi_chieu: { type: Date },
    thoi_luong: { type: String },
    ngon_ngu: { type: String },
    slug: { type: String, unique: true },
    src: { type: String },
}, {
    timestamps: true,
});

FilmSchema.pre('save', function(next) {
    if (this.title && !this.slug) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

const Film = mongoose.model('Film', FilmSchema);

export default Film;

