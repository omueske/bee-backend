import express from 'express';
//import db from './db/db';
import bodyParser from 'body-parser';

// Import Routers
import hiveRouter from './routes/hives.js';
import queenRouter from './routes/queens.js';
import helperRouter from './routes/helper.js';

// Set up the express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Load Routers
app.use(hiveRouter);
app.use(queenRouter);
app.use(helperRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});