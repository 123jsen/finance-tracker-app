// Packages from npm
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

// Imports from other files
const stockRouter = require('./api/stock.api.js');
const userRouter = require('./api/user.api.js');
const loginRouter = require('./api/login.api.js');
const log = require('./log.js');
const auth = require('./authenticate.js');

const app = express();

//setup dbUri in .env
const dbUri = process.env.MONGODB_KEY;
mongoose.connect(dbUri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function () {
  console.log('app.js: Start Server');

  app.use(cors());

  // Middleware for parsing json
  app.use(express.json());

  // Middleware for logging requests
  app.use(log);

  // User Login API
  app.use('/login', loginRouter);

  // Middleware for verifying user identity
  app.use(auth);

  // Other Express APIs
  app.use('/user', userRouter);
  app.use('/stock', stockRouter);
});

const server = app.listen(process.env.PORT || 3000);
