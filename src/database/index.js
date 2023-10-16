import mongoose from 'mongoose'

const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ndaloben8:1KiRG0WDtr0Jg0Vp@cluster0.xye9iuy.mongodb.net/');
        console.log('database connected')
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB;
