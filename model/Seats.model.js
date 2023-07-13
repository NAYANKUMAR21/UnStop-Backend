const mongoose = require('mongoose');
const file = {
  Seat_Number: { type: Number, require: [true, 'Please Enter Seat Number'] },
  row: { type: Number, require: true },
  isBooked: { type: Boolean, enum: [false, true] },
};
const SeatSchema = new mongoose.Schema(file);
const SeatModel = mongoose.model('Seats', SeatSchema);
module.exports = SeatModel;
