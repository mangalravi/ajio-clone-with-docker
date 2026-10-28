
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error('MONGO_URI is missing from .env file');
    }

    const conn = await mongoose.connect(uri);

    console.log(`MongoDB connected: ${conn.connection.host}`);
    console.log(`Database name: ${conn.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

export default connectDB;
