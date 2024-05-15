const Transaction = require('../models/transaction');

exports.createTransaction = async (req, res) => {
    try {
        const { amountPaid, phoneNumber, description } = req.body;

        const transaction = new Transaction({ amountPaid, phoneNumber, description });
        await transaction.save();

        res.status(201).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Implement other controller functions for reading, updating, and deleting transactions as needed
