const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('express-async-errors');
const routes = require('./routes');
const { errorHandler, requestLogger } = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));
app.use(requestLogger);

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

app.use('/api/v1', routes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    path: req.path
  });
});

app.use(errorHandler);

module.exports = app;
