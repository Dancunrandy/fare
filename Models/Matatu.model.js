const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatatuSchema = new Schema({
  fleetNumber: {
    type: String,
    required: true,
    unique: true,
  },
  numberPlate: {
    type: String,
    required: true,
    unique: true,
  },
  walletId: {
    type: String,
    required: true,
  },
});

const Matatu = mongoose.model('Matatu', MatatuSchema);
module.exports = Matatu;
