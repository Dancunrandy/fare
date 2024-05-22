const express = require('express');
const createHttpError = require('http-errors');
const router = express.Router();
const IntaSend = require('intasend-node');
const Matatu = require('../Models/Matatu.model');

const intasend = new IntaSend(
  process.env.INTASEND_PUBLISHABLE_KEY, 
  process.env.INTASEND_SECRET_KEY, 
  true
);

router.post('/mpesa', async (req, res, next) => {
  try {
    const { fleetNumber, numberPlate, firstName, lastName, email, phoneNumber, amount } = req.body;

    if (!(fleetNumber || numberPlate) || !firstName || !lastName || !email || !phoneNumber || !amount) {
      throw createHttpError.BadRequest('At least one of fleet number or number plate is required, along with all other fields');
    }

    let query = {};
    if (fleetNumber) query.fleetNumber = fleetNumber;
    if (numberPlate) query.numberPlate = numberPlate;

    const matatu = await Matatu.findOne(query);

    if (!matatu) {
      throw createHttpError.NotFound('Matatu not found');
    }

    let collection = intasend.collection();
    const paymentResponse = await collection.mpesaStkPush({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      amount: amount,
      api_ref: `Payment for ${fleetNumber || numberPlate}`
    });

    res.status(200).json(paymentResponse);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
