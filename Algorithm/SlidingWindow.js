const client = require('../Redis/redis.config');
const SeatModel = require('../model/Seats.model');

async function SeatBooking(num) {
  try {
    const getSeats = await SeatModel.find({ isBooked: { $in: false } });
    console.log(getSeats.length);
    for (let i = 0; i < getSeats.length; i++) {
      let arr = [];
      for (let j = i; j < i + num; j++) {
        arr.push(getSeats[j]);
      }

      let check = checkIfAllAreSameRow(arr, 1);
      let x = await UpdateDB(check, arr);
      if (check && x) {
        return true;
      }

      let row2 = checkIfAllAreSameRow(arr, 2);
      x = await UpdateDB(row2, arr);
      if (row2 && x) {
        return true;
      }
      let row3 = checkIfAllAreSameRow(arr, 3);
      x = await UpdateDB(row3, arr);
      if (row3 && x) {
        return true;
      }
      let row4 = checkIfAllAreSameRow(arr, 4);
      x = await UpdateDB(row4, arr);
      if (row4 && x) {
        return true;
      }
      let row5 = checkIfAllAreSameRow(arr, 5);
      x = await UpdateDB(row5, arr);
      if (row5 && x) {
        return true;
      }
      let row6 = checkIfAllAreSameRow(arr, 6);
      x = await UpdateDB(row6, arr);
      if (row6 && x) {
        return true;
      }
      let row7 = checkIfAllAreSameRow(arr, 7);
      x = await UpdateDB(row7, arr);
      if (row7 && x) {
        return true;
      }
    }
    return false;
  } catch (er) {
    return false;
  }
}
async function UpdateDB(check, arr) {
  try {
    if (check) {
      for (let l = 0; l < arr.length; l++) {
        arr[l].isBooked = true;
        await SeatModel.findByIdAndUpdate(
          { _id: arr[l]._id },
          { $set: { isBooked: true } },
          { new: true }
        );
      }
      await client.set('latest', JSON.stringify(arr));
      return true;
    }
    return false;
  } catch (er) {
    return false;
  }
}
function checkIfAllAreSameRow(arr, rows) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    if (obj[arr[i].row] == undefined) {
      obj[arr[i].row] = 1;
    } else {
      obj[arr[i].row]++;
    }
  }
  if (Object.keys(obj).length === rows) {
    return true;
  }
  return false;
}
function checkLastRow(data, num) {
  for (let i = data.length - 1; i >= data.length - num; j--) {}
}
module.exports = SeatBooking;
