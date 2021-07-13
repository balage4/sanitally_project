import dotenv from 'dotenv';
import logger from './logger';
import app from './app';
import db from './db';

dotenv.config();
db();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`App is listening on ${PORT}`);
});
