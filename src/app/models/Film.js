import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const FilmSchema = new Schema({
    title: { type: String, required: true },
    note: { type: String }, 
    dao_dien: { type: String },
    dien_vien: { type: String }, 
    the_loai: { type: String },
    khoi_chieu: { type: Date },
    thoi_luong: { type: String }, 
    ngon_ngu: { type: String }, 
    slug: { type: String, slug: "title", unique: true },
    src: { type: String }, 
}, {
    timestamps: true,
});

const Film = mongoose.model('Film', FilmSchema);

export default Film;
