const SeatModel = require('../model/Seats.model');
const client = require('../Redis/redis.config');
async function unBook(req, res) {
  const { id } = req.params;
  try {
    const SeatsBooked = await client.get('latest');
    let x = JSON.parse(SeatsBooked);
    await client.set(
      'latest',
      JSON.stringify(
        x?.filter((item) => {
          if (item._id !== id) {
            return item;
          }
        })
      )
    );
    const upateSeat = await SeatModel.findByIdAndUpdate(
      { _id: id },
      { isBooked: false },
      { new: true }
    );
    return res
      .status(200)
      .send({ message: `Updated Seat Number ${upateSeat.Seat_Number}` });
  } catch (er) {
    return res.status(404).send({ message: er.message });
  }
}
module.exports = unBook;
