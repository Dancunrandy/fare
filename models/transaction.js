const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amountPaid: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    phoneNumber: String,
    description: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
