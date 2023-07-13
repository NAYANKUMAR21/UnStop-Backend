const express = require('express');
const app = express.Router();

const {
  SeatsToBeBooked,
  DetaultSetting,
  GetAllSeats,
} = require('../controller/Seats.controller');

app.post('/:num', SeatsToBeBooked);
app.patch('/default-Setting', DetaultSetting);
app.get('/get-all-seats', GetAllSeats);

module.exports = app;
