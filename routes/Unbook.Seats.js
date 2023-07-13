const express = require('express');
const unBook = require('../controller/UnBook.controller');
const app = express.Router();

app.patch('/:id', unBook);

module.exports = app;
