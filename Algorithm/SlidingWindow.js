const client = require('../Redis/redis.config');
const SeatModel = require('../model/Seats.model');

async function SeatBooking(num) {
  try {
    const getSeats = await SeatModel.find({ isBooked: { $in: false } });

    console.log(getSeats.length);

    for (let i = 0; i < getSeats.length - num + 1; i++) {
      let arr = [];
      for (let j = i; j < i + num; j++) {
        arr.push(getSeats[j]);
      }

      let check = checkIfAllAreSameRow(arr, 1);
      if (check) {
        await UpdateDB(true, arr);
        return true;
      }
    }
    console.log('Here is pointer ');
    let checkAvialability = await SubSlidingWindow(getSeats, num);
    //  await AddP2Seats(getSeats, num);
    if (checkAvialability) {
      return true;
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
  if (Object.keys(obj).length == rows) {
    return true;
  }
  return false;
}
async function AddP2Seats(getSeats, num) {
  try {
    console.log('this,Seat is not booked', 1);
    //above everything is right
    let obj = {};
    for (let i = 0; i < getSeats.length; i++) {
      if (obj[getSeats[i].row] == undefined) {
        obj[getSeats[i].row] = [getSeats[i]._id];
      } else {
        obj[getSeats[i].row].push(getSeats[i]._id);
      }
    }
    console.log('this,Seat is not booked', 2);
    let min = Infinity;
    let RowsAvialable = 0;
    let sum = 0;
    let final = [];
    let SeatsAvialable = [];
    for (let key in obj) {
      sum += obj[key].length;
      RowsAvialable = RowsAvialable + 1;
      final.push(...obj[key]);
      console.log('this,Seat is not booked', 3, final);

      if (sum >= num) {
        if (RowsAvialable < min) {
          min = RowsAvialable;
          SeatsAvialable = [];
          SeatsAvialable.push(...final);
        }
        final = [];
        sum = 0;
        RowsAvialable = 0;
      }
    }
    console.log('this,Seat is not booked', 4);

    if (SeatsAvialable.length >= min) {
      console.log('this,Seat is not booked', 5);
      let result = [];
      let count = 0;
      for (let i = 0; i < SeatsAvialable.length; i++) {
        if (count < num) {
          let x = getSeats?.filter((item, index) => {
            if (item._id === SeatsAvialable[i]) {
              count++;
              return item;
            }
          });
          result.push(...x);
        }
      }
      console.log('this,Seat is not booked', 6);
      await UpdateDB(true, result);
      return true;
    }
    console.log('this,Seat is not booked', 7);
    return false;
  } catch (er) {
    console.log(er.message);
    return false;
  }
}
async function SubSlidingWindow(getSeats, num) {
  try {
    // console.log(getSeats);
    let min = Infinity;
    let arr = [];
    let final = [];
    for (let i = 0; i <= getSeats.length - num; i++) {
      arr = [];
      for (let j = i; j < i + num; j++) {
        arr.push(getSeats[j]);
      }
      // console.log(arr);
      let x = Math.abs(arr[0].Seat_Number - arr[arr.length - 1].Seat_Number);
      if (x < min) {
        min = x;
        final = [];
        final.push(...arr);
      }
      // console.log('------------------------------');
    }
    if (min !== Infinity) {
      await UpdateDB(true, final);
      return true;
    }
    return false;
  } catch (er) {
    console.log(er.message);
    return false;
  }
}
module.exports = SeatBooking;
/*
 */
