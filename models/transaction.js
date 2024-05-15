const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amountPaid: {
        type: Number,
        restricted: true 
        

    },
    createdAt: {
        type: Date,
        default: Date.now,
        restricted: true 
        
    },
    phoneNumber: {
        type: String,
        restricted: true 
        
    },
    sacco: {
        type: String,
        restricted: false 
        
    },
    fleetNumber: {
        type: String,
        restricted: true 
        
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
