import mongoose from 'mongoose';
import logger from './logger';

export default async function db() {
  try {
    await mongoose.connect(
      process.env.DB_CONNECT,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      });
    logger.info('db connected');
  } catch (err) {
    logger.error(err.message);
  }
}
