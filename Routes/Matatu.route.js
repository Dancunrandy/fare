const express = require('express');
const createHttpError = require('http-errors');
const router = express.Router();
const Matatu = require('../Models/Matatu.model');
const IntaSend = require('intasend-node');

const intasend = new IntaSend(
  process.env.INTASEND_PUBLISHABLE_KEY, 
  process.env.INTASEND_SECRET_KEY, 
  true
);

router.post('/register', async (req, res, next) => {
  try {
    const { fleetNumber, numberPlate, sacco, image } = req.body;

    if (!fleetNumber || !numberPlate || !sacco) {
      throw createHttpError.BadRequest('Fleet number, number plate, and sacco are required');
    }

    // Check for existing matatu with the same fleet number or number plate
    const existingMatatu = await Matatu.findOne({ 
      $or: [{ fleetNumber }, { numberPlate }] 
    });
    if (existingMatatu) {
      throw createHttpError.Conflict('Matatu with the same fleet number or number plate already exists');
    }

    const newMatatu = new Matatu({ fleetNumber, numberPlate, sacco, image });

    let wallets = intasend.wallets();
    const walletResponse = await wallets.create({
      label: `Wallet for ${fleetNumber} - ${numberPlate}`,
      wallet_type: 'WORKING',
      currency: 'KES',
      can_disburse: true
    });

    newMatatu.walletId = walletResponse.wallet_id;
    await newMatatu.save();

    res.status(201).json({
      message: 'Matatu registered successfully',
      matatu: newMatatu
    });
  } catch (error) {
    console.error('Error registering matatu:', error); // Detailed error logging
    res.status(500).json({
      error: {
        status: 500,
        message: error.message || 'Internal Server Error'
      }
    });
  }
});

module.exports = router;
