const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const router = express.Router();
const User = require('../Models/User.model');
const FinancialData = require('../Models/FinancialData.model');
const Matatu = require('../Models/Matatu.model');

// Register a new user
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, fleetNumber, numberPlate } = req.body;

    if (!email || !password || (!fleetNumber && !numberPlate)) {
      throw createHttpError.BadRequest('Email, password, and either fleet number or number plate are required');
    }

    let matatuQuery = {};
    if (fleetNumber) matatuQuery.fleetNumber = fleetNumber;
    if (numberPlate) matatuQuery.numberPlate = numberPlate;

    const existingMatatu = await Matatu.findOne(matatuQuery);
    if (!existingMatatu) {
      throw createHttpError.NotFound('Matatu not found');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createHttpError.Conflict(`User with email ${email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword, fleetNumber: existingMatatu.fleetNumber });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', redirectUrl: `/dashboard?fleetNumber=${existingMatatu.fleetNumber}` });
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

// Request password reset
router.post('/request-password-reset', async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw createHttpError.BadRequest('Email is required');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError.NotFound('User not found');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

    user.resetToken = token;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      to: email,
      from: process.env.EMAIL,
      subject: 'Password Reset Request',
      text: `You are receiving this because you (or someone else) have requested a password reset for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://${req.headers.host}/reset-password/${token}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    next(error);
  }
});

// Reset password
router.post('/reset-password/:token', async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      throw createHttpError.BadRequest('Password is required');
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() } // Check if the token has expired
    });

    if (!user) {
      throw createHttpError.BadRequest('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
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

module.exports = router;
