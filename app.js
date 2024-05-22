const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();
require('./helpers/init_mongodb');

const AuthRoute = require('./Routes/Auth.route');
const MatatuRoute = require('./Routes/Matatu.route');
const PaymentRoute = require('./Routes/Payment.route');
const DashboardRoute = require('./Routes/Dashboard.route');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res, next) => {
  res.send('Hello world...');
});

app.use('/auth', AuthRoute);
app.use('/matatu', MatatuRoute);
app.use('/payment', PaymentRoute);
app.use('/dashboard', DashboardRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || 'Internal Server Error'
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
