const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FinancialDataSchema = new Schema({
  fleetNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  dailyIncome: {
    type: Number,
    default: 0,
  },
  weeklyIncome: {
    type: Number,
    default: 0,
  },
  monthlyIncome: {
    type: Number,
    default: 0,
  },
});

const FinancialData = mongoose.model('FinancialData', FinancialDataSchema);
module.exports = FinancialData;
