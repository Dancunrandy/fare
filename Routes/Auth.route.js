const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const router = express.Router();
const User = require('../Models/User.model');
const Bus = require('../Models/Bus.model');
const FinancialData = require('../Models/FinancialData.model');

// Register a new user
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, fleetNumber } = req.body;

    if (!email || !password || !fleetNumber) {
      throw createHttpError.BadRequest('Email, password and fleet number are required');
    }

    const existingBus = await Bus.findOne({ fleetNumber });
    if (!existingBus) {
      throw createHttpError.NotFound('Bus with this fleet number not found');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createHttpError.Conflict(`User with email ${email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword, fleetNumber });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', redirectUrl: `/dashboard?fleetNumber=${fleetNumber}` });
  } catch (error) {
    next(error);
  }
});

// Login a user
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createHttpError.BadRequest('Email and password are required');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError.NotFound('User not registered');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw createHttpError.Unauthorized('Invalid email or password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});


// Refresh token route (if needed)
router.post('/refresh-token', async (req, res, next) => {
  res.send('refresh route');
});

// Logout a user
router.delete('/logout', async (req, res, next) => {
  res.send('logout route');
});

// Get financial data for a fleet
router.get('/financial-data', async (req, res, next) => {
  try {
    const { fleetNumber } = req.query;
    if (!fleetNumber) {
      throw createHttpError.BadRequest('Fleet number is required');
    }

    const financialData = await FinancialData.find({ fleetNumber });
    if (!financialData) {
      throw createHttpError.NotFound('No financial data found for this fleet number');
    }

    res.status(200).json(financialData);
  } catch (error) {
    next(error);
  }
});

router.post('/register-bus', async (req, res, next) => {
  try {
    const { fleetNumber, numberPlate } = req.body;

    if (!fleetNumber || !numberPlate) {
      throw createHttpError.BadRequest('Fleet number and number plate are required');
    }

    const existingBus = await Bus.findOne({ fleetNumber });
    if (existingBus) {
      throw createHttpError.Conflict(`Bus with fleet number ${fleetNumber} already exists`);
    }

    const newBus = new Bus({ fleetNumber, numberPlate });
    await newBus.save();

    res.status(201).json({ message: 'Bus registered successfully' });
  } catch (error) {
    next(error);
  }
});

router.get('/dashboard', async (req, res, next) => {
  try {
    const { fleetNumber } = req.query;

    if (!fleetNumber) {
      throw createHttpError.BadRequest('Fleet number is required');
    }

    const financialData = await FinancialData.find({ fleetNumber });

    if (financialData.length === 0) {
      throw createHttpError.NotFound('No financial data found for this fleet number');
    }

    const totalIncome = financialData.reduce((total, data) => total + data.dailyIncome + data.weeklyIncome + data.monthlyIncome, 0);

    res.status(200).json({ fleetNumber, totalIncome });
  } catch (error) {
    next(error);
  }
});



module.exports = router;
