// src/models/User.js
import mongoose from 'mongoose';

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
});

// Tạo model User
const User = mongoose.model('User', userSchema);
export default User;
