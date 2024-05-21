const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusSchema = new Schema({
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
});

const Bus = mongoose.model('Bus', BusSchema);
module.exports = Bus;
