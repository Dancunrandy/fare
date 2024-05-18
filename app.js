const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();
require('./helpers/init_mongodb')

const AuthRoute = require('./Routes/Auth.route');

const app = express();

// Middleware for logging HTTP requests
app.use(morgan('dev'));

// Middleware for parsing JSON bodies
app.use(express.json());

// Handle route
app.get('/', async (req, res, next) => {
  res.send('Hello world...');
});

// Mount the AuthRoute under the /auth path
app.use('/auth', AuthRoute);

// Handle 404 errors
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

// General error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
