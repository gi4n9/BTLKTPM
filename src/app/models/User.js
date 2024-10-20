// src/models/User.js
import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  filmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: true,
  },
  theaterId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  seats: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,  // Trường username là bắt buộc
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Đảm bảo email là duy nhất
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,  // Có thể là String để lưu số điện thoại
    required: true,  // Trường contact là bắt buộc
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  tickets: [ticketSchema],
});


// Tạo model User
const User = mongoose.model('User', userSchema);
export default User;
