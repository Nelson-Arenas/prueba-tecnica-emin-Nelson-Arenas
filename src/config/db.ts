import mongoose from 'mongoose';

export const connectToDatabase = async () => {
    try {
        const mongoUrl = process.env.MONGO_URI;
        await mongoose.connect(mongoUrl, {
        } as mongoose.ConnectOptions);

        const url = mongoose.connection.host;
        const port = mongoose.connection.port;
        console.log(`MongoDB connected: ${url}/${port}`);

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error;
    }
};