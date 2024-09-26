import mongoose from 'mongoose';

const connect = async() => {
    try {
        await mongoose.connect('mongodb://192.168.0.102:27017/list_film_dev');
        console.log("connect successfully");
    } catch (error) {
        console.log("connect fail", error);
    }
}

export { connect };