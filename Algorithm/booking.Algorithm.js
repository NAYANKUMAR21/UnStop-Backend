let SeatModel = require('../model/Seats.model');
let client = require('../Redis/redis.config');
const SeatBooking = require('./SlidingWindow');
async function BookingSeats(num) {
  let { matrix, data } = await generate2DMatrix();
  let firstIndex = -1;
  let SeatsAdded = false;
  for (let i = 0; i < matrix.length; i++) {
    let flag = false;

    for (let d = 0; d < matrix[i].length; d++) {
      if (matrix[i][d].isBooked === false) {
        firstIndex = d;
        flag = true;
        break;
      }
    }

    if (firstIndex >= 0) {
      let zeroCount = 0;
      console.log('enterd first Index');

      for (let j = firstIndex; j < matrix[i].length; j++) {
        firstIndex == 9 ? console.log(matrix[i][j].Seat_Number) : null;
        firstIndex == 8 ? console.log(matrix[i][j].Seat_Number) : null;
        if (matrix[i][j] && matrix[i][j].isBooked === false) {
          zeroCount++;
        }
      }
      console.log('Passed for loop');
      let flag = false;

      if (num <= zeroCount) {
        console.log("entered num<zero's");
        let updatedSeats = [];
        let ContentToBeUpdate = [];
        for (let k = firstIndex; k < firstIndex + num; k++) {
          matrix[i][k].isBooked = true;
          ContentToBeUpdate.push(matrix[i][k]);
          updatedSeats.push(matrix[i][k]._id);
        }

        flag = true;
        if (flag) {
          SeatsAdded = true;

          for (let l = 0; l < updatedSeats.length; l++) {
            await SeatModel.findByIdAndUpdate(
              { _id: updatedSeats[l] },
              { ...ContentToBeUpdate[l] },
              { new: true }
            );
          }

          await client.set('latest', JSON.stringify(ContentToBeUpdate));
          return ContentToBeUpdate;
        }
      }
      // console.log('here', i);
      // console.log('seat Added', SeatsAdded);
      // console.log('------------------------');
    }
  }
  if (!SeatsAdded) {
    console.log('No Seat got booked', num);
    // let emptyRow = [];
    // for (let i = 0; i < matrix.length; i++) {
    //   for (let j = 0; j < matrix[i].length; j++) {
    //     if (matrix[i][j].isBooked === false && emptyRow.length != num) {
    //       matrix[i][j].isBooked = true;
    //       emptyRow.push(matrix[i][j]);
    //     }
    //   }
    // }
    // console.log(emptyRow.length);
    // let WereItemsAddedflag = false;
    // if (emptyRow.length !== 0) {
    //   for (let l = 0; l < emptyRow.length; l++) {
    //     await SeatModel.findByIdAndUpdate(
    //       { _id: emptyRow[l]._id },
    //       { ...emptyRow[l] },
    //       { new: true }
    //     );
    //   }
    //   WereItemsAddedflag = true;
    // }
    // if (WereItemsAddedflag) {
    //   await client.set('latest', JSON.stringify(emptyRow));
    //   return emptyRow;
    // }
    let x = await SeatBooking(num);
    if (x) {
      return true;
    }
    return false;
  }
}
async function generate2DMatrix() {
  try {
    let data = await SeatModel.find();
    let row1 = data?.filter((item, index) => {
      if (item.row == 1) {
        return item;
      }
    });
    let row2 = data?.filter((item, index) => {
      if (item.row == 2) {
        return item;
      }
    });
    let row3 = data?.filter((item, index) => {
      if (item.row == 3) {
        return item;
      }
    });
    let row4 = data?.filter((item, index) => {
      if (item.row == 4) {
        return item;
      }
    });
    let row5 = data?.filter((item, index) => {
      if (item.row == 5) {
        return item;
      }
    });
    let row6 = data?.filter((item, index) => {
      if (item.row == 6) {
        return item;
      }
    });
    let row7 = data?.filter((item, index) => {
      if (item.row == 7) {
        return item;
      }
    });
    let row8 = data?.filter((item, index) => {
      if (item.row == 8) {
        return item;
      }
    });
    let row9 = data?.filter((item, index) => {
      if (item.row == 9) {
        return item;
      }
    });
    let row10 = data?.filter((item, index) => {
      if (item.row == 10) {
        return item;
      }
    });
    let row11 = data?.filter((item, index) => {
      if (item.row == 11) {
        return item;
      }
    });
    let row12 = data?.filter((item, index) => {
      if (item.row == 12) {
        return item;
      }
    });
    let matrix = [
      row1,
      row2,
      row3,
      row4,
      row5,
      row6,
      row7,
      row8,
      row9,
      row10,
      [...row11, ...row12],
    ];

    return { matrix: matrix, data: data };
  } catch (er) {
    return er.message;
  }
}
module.exports = BookingSeats;
