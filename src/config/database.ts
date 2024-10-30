import mongoose from "mongoose"
import config from "./config"
import logger from "./logger";

export const connectDB = async(): Promise<void> =>{
    try {
        const mongoUri = config.env.MONGO_URI;
        // Check if URI already contains a database name
        const uriWithDB = mongoUri.includes('/?') 
            ? mongoUri.replace('/?', '/yellofit?')
            : mongoUri.includes('?')
            ? mongoUri.replace('?', '/yellofit?')
            : mongoUri.endsWith('/')
            ? `${mongoUri}yellofit`
            : `${mongoUri}/yellofit`;

        const conn = await mongoose.connect(uriWithDB);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);

        if (conn.connection.db) {
            logger.info(`Using database: ${conn.connection.db.databaseName}`);
        }    
        
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