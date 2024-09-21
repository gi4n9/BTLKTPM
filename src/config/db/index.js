import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/list_film_dev');
        console.log("connect successfully");
    } catch (error) {
        console.log("connect fail", error);
    }
}
