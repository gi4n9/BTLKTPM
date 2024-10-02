import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TheaterSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String },
    src: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Theater = mongoose.model('Theater', TheaterSchema);

export default Theater;
