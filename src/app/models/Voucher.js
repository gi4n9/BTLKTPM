import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const VoucherSchema = new Schema({
    title: { type: String, required: true },
    time: { type: Date },
    note: { type: String },
    src: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Voucher = mongoose.model('Voucher', VoucherSchema);

export default Voucher;
