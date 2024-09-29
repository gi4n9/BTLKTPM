import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SaleSchema = new Schema({
    tile: { type: String, required: true },
    time: { type: Date },
    note: { type: String },
    src: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Sale = mongoose.model('Sale', SaleSchema);

export default Sale;
