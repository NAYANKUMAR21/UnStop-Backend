const BookingSeats = require('../Algorithm/booking.Algorithm');
const SeatBooking = require('../Algorithm/SlidingWindow');
const SeatModel = require('../model/Seats.model');
let client = require('../Redis/redis.config');
const SeatsToBeBooked = async (req, res) => {
  const { num } = req.params;
  let numOfSeats = Number(num);

  console.log(typeof numOfSeats);

  if (numOfSeats > 7) {
    return res.status(404).send({ message: 'Enter Number Below 7' });
  }
  try {
    let x = await BookingSeats(numOfSeats);
    if (x) {
      return res.status(200).send({ message: 'Seats Booked', bookedSeats: x });
    }

    return res.status(404).send('Seats Not Avialable');
  } catch (er) {
    return res.status(404).send({ message: er.message });
  }
};
const DetaultSetting = async (req, res) => {
  try {
    await client.set('latest', JSON.stringify([]));
    const defaultSetting = await SeatModel.updateMany(
      {},
      { isBooked: false },
      { multi: true }
    );
    return res.status(200).send(defaultSetting);
  } catch (er) {
    return res.status(404).send({ message: er.message });
  }
};
const GetAllSeats = async (req, res) => {
  try {
    let x = await client.get('latest');
    x = JSON.parse(x);

    const getAllSeats = await SeatModel.find();
    //link - https://stackblitz.com/edit/angular-6l4btw
    if (x) {
      return res.status(200).send({ getAllSeats, x });
    }
    return res.status(200).send({ getAllSeats });
  } catch (er) {
    return res.status(404).send({ message: er.message });
  }
};
module.exports = { SeatsToBeBooked, DetaultSetting, GetAllSeats };
