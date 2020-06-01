import express from 'express';
//import db from './db/db';
import bodyParser from 'body-parser';
import hiveRouter from './routes/hives.js';

// Set up the express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(hiveRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});