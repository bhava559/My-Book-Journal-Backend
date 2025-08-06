import mongoose from 'mongoose'; 
import { mongoUrl } from '../src/config/myconfig';

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('DB connection error:', err);
  }
};
    