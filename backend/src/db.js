import mongoose from 'mongoose';
import logger from './logger';

// Connect to DB
export default async function db() {
  try {
    await mongoose.connect(
      process.env.DB_CONNECT, 
      { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('db connected');
  } catch(err) {
    logger.error(err.message);
  }
}