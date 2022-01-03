import express from 'express';
import morgan from 'morgan';
import { api, system } from './routes';
import logger from './logger';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(morgan('combined', { stream: logger.stream }));

app.use('/api', api);
app.use('/system', system);

app.use(errorHandler);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../../frontend/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend', 'build', 'index.html'));
  })
}

export default app;