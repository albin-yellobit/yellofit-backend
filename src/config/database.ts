import mongoose from "mongoose"
import config from "./config"
import logger from "./logger";

export const connectDB = async(): Promise<void> =>{
    try {
        const conn = await mongoose.connect(config.env.MONGO_URI);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
        
        mongoose.connection.on('error', (err) => {
        logger.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected');
        });

        process.on('SIGINT', async()=> {
            await mongoose.connection.close();
            logger.info('MongoDB connection closed through app termination');
            process.exit(0);
        })
    } catch (error) {
        logger.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}