require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connect = require('./config/db.config');
const PORT = process.env.PORT || 8080;
const SeatsRouter = require('./routes/Seats.routers');

//middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/book-seats', SeatsRouter);
app.get('/', (req, res) => {
  return res.status(200).send({ message: 'Welcome' });
});
app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Listening on http://localhost:${PORT}`);
  } catch (er) {
    console.log('Listening Error->', er.message);
  }
});
