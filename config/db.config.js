const mongoose = require('mongoose');

require('dotenv').config();
const connect = async () => {
  try {
    console.log(process.env.DB_URL);
    const connectDB = await mongoose.connect(process.env.DB_URL);
    return connectDB;
  } catch (er) {
    console.log('Error', er.message);
  }
};

module.exports = connect;
