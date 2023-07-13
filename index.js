require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connect = require('./config/db.config');
const PORT = process.env.PORT || 8080;

//router
const SeatsRouter = require('./routes/Seats.routers');
const UnBookRouter = require('./routes/Unbook.Seats');
//middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/book-seats', SeatsRouter);
app.use('/ubn-book-seats', UnBookRouter);
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
