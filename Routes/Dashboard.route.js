const express = require('express');
const createHttpError = require('http-errors');
const router = express.Router();
const IntaSend = require('intasend-node');
const Matatu = require('../Models/Matatu.model');

require('dotenv').config();

const intasend = new IntaSend(
  process.env.INTASEND_PUBLISHABLE_KEY,
  process.env.INTASEND_SECRET_KEY,
  true
);

router.get('/dashboard', async (req, res, next) => {
  try {
    const { fleetNumber, numberPlate } = req.query;

    if (!fleetNumber && !numberPlate) {
      throw createHttpError.BadRequest('Fleet number or number plate is required');
    }

    let query = {};
    if (fleetNumber) query.fleetNumber = fleetNumber;
    if (numberPlate) query.numberPlate = numberPlate;
    console.log('Query:', query);

    const matatu = await Matatu.findOne(query);
    console.log('Matatu:', matatu);

    if (!matatu) {
      throw createHttpError.NotFound('Matatu not found');
    }

    let wallets = intasend.wallets();
    const transactionsResponse = await wallets.transactions(matatu.walletId);

    let totalIncome = 0;
    console.log(totalIncome);
    if (Array.isArray(transactionsResponse)) {
      totalIncome = transactionsResponse.reduce((total, transaction) => {
        return total + parseFloat(transaction.value);
      }, 0);
    }

    res.status(200).json({
      fleetNumber: matatu.fleetNumber,
      numberPlate: matatu.numberPlate,
      sacco: matatu.sacco,  // Include the sacco in the response
      totalIncome: totalIncome,
      transactions: transactionsResponse,
    });
  } catch (error) {
    console.error(`Error:`, `${JSON.stringify(error)}`);
    next(error);
  }
});



module.exports = router;
