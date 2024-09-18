import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FilmSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Film = mongoose.model('Film', FilmSchema);

export default Film;
