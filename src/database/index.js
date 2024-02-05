import mongoose from 'mongoose'

// Connect to the database
require('dotenv').config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('database connected')
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB;
