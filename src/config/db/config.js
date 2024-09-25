import mongoose from "mongoose";

// Tạo Schema
const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    }
});

// Tạo collection
const collection = mongoose.model("user", loginSchema);

// Export collection (dùng export default)
export default collection;
